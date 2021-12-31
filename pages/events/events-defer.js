"use strict";
import * as data from "../_data/events.json";
const events = data.events;
// const events = [];
// const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
// const eventWeekDateEl = document.querySelector('#event_week_date');
// const eventPrevWeek = document.querySelector('#event_nav_prev');
// const eventNextWeek = document.querySelector('#event_nav_next');
// console.log(eventNextWeek.innerHTML);
// // console.log(events);

// const getMonday = (d) => {
//     d = new Date(d);
//     var day = d.getDay(),
//         diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
//     return new Date(d.setDate(diff));
// };
// const getMonthNameAndDate = (date) =>{
//     return `${monthNames[date.getMonth()]} ${date.getDate()}`
// }
// const weekFirstDay = getMonday(new Date());

// // set week date
// eventWeekDateEl.innerHTML = `${getMonthNameAndDate(weekFirstDay)}, ${weekFirstDay.getFullYear()}`;
// console.log(weekFirstDay);

// console.log('events-defer.js');
const hasEventListeners = !!window.addEventListener;
const hasClass = function (el, cn) {
    return (" " + el.className + " ").indexOf(" " + cn + " ") !== -1;
};
const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];
const isLeapYear = function (year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};
const isDate = function (obj) {
    return (
        /Date/.test(Object.prototype.toString.call(obj)) &&
        !isNaN(obj.getTime())
    );
};
const getDayEvents = (year, month, day, events) => {
    let eve = [];
    //TODO: get events for the day
    events.forEach((e) => {
        const eventDate = new Date(e.date);
        if (
            eventDate.getFullYear() === year &&
            eventDate.getMonth() === month &&
            eventDate.getDate() === day
        ) {
            eve.push(e);
        }
    });
    return eve;
};
const getDaysInMonth = function (year, month) {
    return [
        31,
        isLeapYear(year) ? 29 : 28,
        31,
        30,
        31,
        30,
        31,
        31,
        30,
        31,
        30,
        31,
    ][month];
};
const setToStartOfDay = function (date) {
    if (isDate(date)) date.setHours(0, 0, 0, 0);
};
const compareDates = function (a, b) {
    return a.getTime() === b.getTime();
};
const addEvent = function (el, e, callback, capture) {
    if (hasEventListeners) {
        el.addEventListener(e, callback, !!capture);
    } else {
        el.attachEvent("on" + e, callback);
    }
};

// Render the calendar
const renderTitle = function (year, month) {
    const titleEle = document.querySelector(".month-name");
    titleEle.innerHTML = months[month] + " " + year;
};
const renderDay = (opts, eventList) => {
    let eventHtml = "";
    if (eventList.length > 0) {
        // eventList.forEach((et) => {
            eventHtml += `<div class="grid justify-end"><svg width="5" height="5" viewBox="0 0 5 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="2.5" cy="2.5" r="2.5" fill="#EC008C"/>
                            </svg></div>`;
        // });
    }
    return `<div class="p-1 grid">
            ${eventHtml}
            <div class="calendar-date text-base ${eventList.length > 0 ? 'cursor-pointer':''}">${opts.day}</div>
          </div>`;
};
const renderBody = (year, month) => {
    const bodyEle = document.querySelector(".calendar-body ");
    const now = new Date();
    setToStartOfDay(now);
    const days = getDaysInMonth(year, month);
    const before = new Date(year, month, 1).getDay();
    let dayHtml = "";
    const totalCell = days + before;
    for (let i = 0; i < totalCell; i++) {
        const day = new Date(year, month, 1 + (i - before));
        const isToday = compareDates(day, now);
        const isEmpty = i < before;
        const isWeekend =
            day.getDay() != 0 &&
            (day.getDay() % 4 == 0 || day.getDay() % 5 == 0);
        const dayNumber = 1 + (i - before);
        if (isEmpty) {
            dayHtml += `<div class="is-empty"></div>`;
        } else {
            const eventList = getDayEvents(year, month, dayNumber, events);
            var dayConfig = {
                day: dayNumber,
                month,
                year,
                isWeekend,
                isToday,
            };
            dayHtml += renderDay(dayConfig, eventList);
        }
    }
    bodyEle.innerHTML = dayHtml;
};


let Events = function (options) {
    var self = this;
    const calendar = document.querySelector("#events_calendar");

    self.gotoDate(new Date());
    self._onClick = function (e) {
        e = e || window.event;
        var target = e.target || e.srcElement,
            pEl = target;

        if (!target) {
            return;
        }
        if (hasClass(target, "nav-next")) {
            self.nextMonth();
        } else if (hasClass(target, "nav-prev")) {
            self.prevMonth();
        }
    };

    // Event listeners
    addEvent(calendar, "click", self._onClick);
};

Events.prototype = {
    gotoDate: function (date) {
        if (!isDate(date)) {
            return;
        }
        this.calendar = {
            month: date.getMonth(),
            year: date.getFullYear(),
        };
        this.draw();
    },
    nextMonth: function () {
        this.calendar.month++;
        if (this.calendar.month > 11) {
            this.calendar.month = 0;
            this.calendar.year++;
        }
        this.draw();
    },
    prevMonth: function () {
        this.calendar.month--;
        if (this.calendar.month < 0) {
            this.calendar.month = 11;
            this.calendar.year--;
        }
        this.draw();
    },
    draw: function (force) {
        renderTitle(this.calendar.year, this.calendar.month);
        renderBody(this.calendar.year, this.calendar.month);
    },
};

new Events();
