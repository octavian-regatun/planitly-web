"use client";
import Button from "@/components/UI/Button";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  areIntervalsOverlapping,
  isWithinInterval,
  startOfDay,
} from "date-fns";
import { isEqual, remove } from "lodash";
import { signOut } from "next-auth/react";
import { useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface AvailableDate {
  startDate: Date;
  endDate: Date;
}

export default function SettingsPage() {
  const [availableDates, setAvailableDates] = useState<AvailableDate[]>([]);
  const [unavailableDates, setUnavailableDates] = useState<AvailableDate[]>([]);
  const [opened, { open, close }] = useDisclosure(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const onChange = (dates: any) => {
    const [start, end] = dates;

    setStartDate(startOfDay(start));
    setEndDate(end);
  };

  function onClearInterval() {
    if (!endDate) return;

    let isOverlapping = false;
    for (const unavailableDate of unavailableDates) {
      isOverlapping = areIntervalsOverlapping(
        { start: startDate, end: endDate },
        { start: unavailableDate.startDate, end: unavailableDate.endDate }
      );

      if (isOverlapping) {
        console.log("overlapping");

        // unavailableDates.forEach(date => {
        //   console.log(isEqual(date, unavailableDate));
        // });

        console.log(
          unavailableDates.filter(date => !isEqual(date, unavailableDate))
        );

        // setUnavailableDates(newArr);
      }
    }
  }

  function onSetUnavailable() {
    if (endDate === null) return;
    setUnavailableDates([...unavailableDates, { startDate, endDate }]);
  }

  function onSave() {
    console.log({ availableDates, unavailableDates });
  }

  return (
    <>
      <div className="flex flex-col items-center gap-8 px-4 pt-4">
        <p className="text-2xl">Settings</p>
        <div className="flex flex-col gap-4">
          <Button onClick={() => void signOut()}>Sign Out</Button>
          <Button onClick={open}>Set Availability</Button>
        </div>
      </div>
      <Modal
        classNames={{ body: "flex flex-col items-center justify-center gap-4" }}
        opened={opened}
        onClose={close}
        centered
        withCloseButton={false}
      >
        <ReactDatePicker
          selected={startDate}
          onChange={onChange}
          startDate={startDate}
          endDate={endDate}
          inline
          selectsRange
          renderDayContents={(dayNumber, date) => {
            if (!date) return;

            let isUnavailable = false;

            for (const { startDate, endDate } of unavailableDates) {
              isUnavailable = isWithinInterval(date, {
                start: startDate,
                end: endDate,
              });

              if (isUnavailable) break;
            }

            return (
              <div className="flex h-12 flex-col items-center">
                <span>{dayNumber}</span>

                {isUnavailable && (
                  <XMarkIcon className="h-4 w-4 text-red-600" />
                )}
              </div>
            );
          }}
        />
        <div className="flex w-full flex-wrap gap-2">
          <button
            onClick={onSetUnavailable}
            className="flex-1 rounded border border-teal-500 px-4 py-2 text-teal-500 transition-colors hover:border-teal-600 hover:text-teal-600"
          >
            Set Unavailable
          </button>
          <button
            onClick={onClearInterval}
            className="flex-1 rounded border border-teal-500 px-4 py-2 text-teal-500 transition-colors hover:border-teal-600 hover:text-teal-600"
          >
            Clear Interval
          </button>
          <button
            className="w-full rounded border border-teal-500 bg-teal-500 px-4 py-2 text-white transition-colors hover:bg-teal-600"
            onClick={onSave}
          >
            Save
          </button>
        </div>
      </Modal>
    </>
  );
}
