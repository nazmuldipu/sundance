"use strict";

function initEvents(events){
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
    var days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
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
    const getMonthNameAndDate = (date) => {
        return `${months[date.getMonth()]} ${date.getDate()}`;
    };
    const getDayNameAndDate = (date) => {
        return `${days[date.getDay()]} ${date.getDate()}`;
    };
    const getPreviousMonday = (d) => {
        d = new Date(d);
        var day = d.getDay(),
            diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
        return new Date(d.setDate(diff));
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
                <div class="calendar-date text-base ${
                    eventList.length > 0 ? "cursor-pointer font-semibold" : ""
                }">${opts.day}</div>
              </div>`;
    };
    const renderBody = (year, month) => {
        const bodyEle = document.querySelector(".calendar-body ");
        const now = new Date();
        setToStartOfDay(now);
        const days = getDaysInMonth(year, month);
        let before = new Date(year, month, 1).getDay() - 1;
        if (before < 0) {
            before = 6;
        }
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
    const renderDayEventList = (year, month, day) => {
        const eveDayListEl = document.querySelector(".events_day_list");
        const eventList = getDayEvents(year, month, Number(day), events);
        let eveHtml = "";
        if (eventList.length > 0) {
            eventList.forEach((e) => {
                eveHtml += `<div class="event_day_list_item grid">
                                <div class="font-bold text-lg">${getDayNameAndDate(
                                    new Date(e.date)
                                )}</div>
                                <div class="event_card grid">
                                    <a href="/events/events-details/?id=${e._id}" class="text-xl font-semibold no-underline text--color__sp-1 pb-2 hover:text-n1">${
                                        e.title
                                    }</a>
                                    <div class="font-calibre text-xs">${getMonthNameAndDate(
                                        new Date(e.date)
                                    )} @ ${e.time}</div>
                                </div>
                            </div>`;
            });
        }
        eveDayListEl.innerHTML = eveHtml;
    };
    const renderWeekCalendarTitle = (week) => {
        const eventWeekDateEl = document.querySelector("#event_week_date");
        eventWeekDateEl.innerHTML = `${getMonthNameAndDate(
            week
        )}, ${week.getFullYear()}`;
    };
    const renderWeekCalendarBody = (week) => {
        const weekEveContainer = document.querySelector(".week_event_container");
        let eveHtml = "";
        for (let i = 0; i < 7; i++) {
            const dd = new Date(week);
            dd.setDate(dd.getDate() + i);
            const eventList = getDayEvents(
                dd.getFullYear(),
                dd.getMonth(),
                dd.getDate(),
                events
            );
            if (eventList.length > 0) {
                eventList.forEach((e) => {
                    eveHtml += `<div class="week_event border-t-1 border--color__sp-4 pt-4 pb-8 text-base">
                    <div class="">${getDayNameAndDate(
                        new Date(e.date)
                    )}</div>
                    <div class="event_card grid pl-7">
                        <a href="/events/events-details/?id=${e._id}" class="text-2xl font-semibold no-underline text--color__sp-1 pb-2 hover:text-n1">${
                            e.title
                        }</a>
                        <div class="font-calibre">${getMonthNameAndDate(
                            new Date(e.date)
                        )} @ ${e.time}</div>
                    </div>
                </div>`;
                });
            }
        }
        weekEveContainer.innerHTML = eveHtml;
    };
    
    let Events = function (options) {
        var self = this;
        const calendar = document.querySelector("#events_calendar");
        const weekNext = document.querySelector("#week_next");
        const weekPrev = document.querySelector("#week_prev");
    
        self.init();
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
            if (hasClass(target, "calendar-date")) {
                self.showDayEvents(target.innerHTML);
            }
            if (hasClass(target, "week-next")) {
                self.nextWeek();
            }
            if (hasClass(target, "week-prev")) {
                self.prevWeek();
            }
        };
    
        // Event listeners
        addEvent(calendar, "click", self._onClick);
        addEvent(weekNext, "click", self._onClick);
        addEvent(weekPrev, "click", self._onClick);
    };
    
    Events.prototype = {
        init: function () {
            let date = new Date();
            this.calendar = {
                month: date.getMonth(),
                year: date.getFullYear(),
                week: getPreviousMonday(date),
            };
            this.draw();
            this.drawWeekCalendar();
        },
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
        nextWeek: function () {
            this.calendar.week.setDate(this.calendar.week.getDate() + 7);
            this.drawWeekCalendar();
        },
        prevWeek: function () {
            this.calendar.week.setDate(this.calendar.week.getDate() - 7);
            this.drawWeekCalendar();
        },
        draw: function () {
            renderTitle(this.calendar.year, this.calendar.month);
            renderBody(this.calendar.year, this.calendar.month);
        },
        drawWeekCalendar: function () {
            renderWeekCalendarTitle(this.calendar.week);
            renderWeekCalendarBody(this.calendar.week);
        },
        showDayEvents: function (day) {
            renderDayEventList(
                this.calendar.year,
                this.calendar.month,
                Number(day)
            );
        },
    };
    
    new Events();
}

document.addEventListener("DOMContentLoaded", function () {
   const eventsDom = document.querySelector('#events-holder');
   if(eventsDom){
       const { events } = JSON.parse(eventsDom.dataset.events);
       if(events && events.length > 0){
        initEvents(events);
        eventsDom.dataset.events = "";
       }
   }
})
