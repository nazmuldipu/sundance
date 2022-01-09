// hero-carousel
const items = document.querySelectorAll(".hero-flip__item");
items.forEach((item) => {
    item.addEventListener("click", () => {
        items.forEach((el) => {
            el.classList.remove("collapse");
        });
        item.classList.add("collapse");
    });
});

// thumbnail slider events
const add_image_click_event = () => {
    const slider_images = document.querySelectorAll(
        ".thumbnail-slider__slides__box .image_frame"
    );
    slider_images.forEach(function (slide) {
        slide.addEventListener("click", function () {
            const frame_id = slide.parentElement.dataset.framename;
            const slide_frame = document.getElementById(frame_id);
            slide_frame.firstElementChild.innerHTML = slide.innerHTML;
        });
    });
};

const carousel_buttons = document.querySelectorAll(".carousel-button");
carousel_buttons.forEach(function (button) {
    button.addEventListener("click", function () {
        add_image_click_event();
    });
});

add_image_click_event();

// Events DOM
function initEvents(events) {
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
    const shortMonth = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
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
    const getShortMonthNameAndDate = (date) => {
        return `${shortMonth[date.getMonth()]} ${date.getDate()}`;
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

    const renderWeekCalendarTitle = (week) => {
        const eventWeekDateEl = document.querySelector("#event_week_date");
        eventWeekDateEl.innerHTML = `${getMonthNameAndDate(
            week
        )}, ${week.getFullYear()}`;
    };
    const renderWeekCalendarBody = (week) => {
        const weekEveContainer = document.querySelector(
            "#week_event_container"
        );
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
                    eveHtml += `
                    <div class="sundance-events__events">
                        <div class="sundance-events__events__date">${getShortMonthNameAndDate(new Date(e.date))}, ${week.getFullYear()}</div>
                        <div class="sundance-events__events__title font-calibre">
                            ${e.title}
                            <br>
                            <span class="link">
                                <a href="/events/events-details/?id=${e._id}" class="link link--primary font-calibre text-base" target="_self"> Details </a>
                            </span>
                            <span class="time">${e.time}</span>
                        </div>
                        <div class="sundance-events__events__action">
                            <a href="/events/events-details/?id=${e._id}" class="button button--secondary font-calibre sundance-events__links" target="_self"> Details</a>
                        </div>
                        </div>
`;
                });
            }
        }
        weekEveContainer.innerHTML = eveHtml;
    };

    let Events = function (options) {
        var self = this;
        const weekNext = document.querySelector(".week_next");
        const weekPrev = document.querySelector(".week_prev");
        self.init();
        self._onClick = function (e) {
            e = e || window.event;
            var target = e.target || e.srcElement,
                pEl = target;

            if (!target) {
                return;
            }
            if (hasClass(target, "week_next")) {
                self.nextWeek();
            }
            if (hasClass(target, "week_prev")) {
                self.prevWeek();
            }
        };

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
            this.drawWeekCalendar();
        },
        nextWeek: function () {
            this.calendar.week.setDate(this.calendar.week.getDate() + 7);
            this.drawWeekCalendar();
        },
        prevWeek: function () {
            this.calendar.week.setDate(this.calendar.week.getDate() - 7);
            this.drawWeekCalendar();
        },
        drawWeekCalendar: function () {
            renderWeekCalendarTitle(this.calendar.week);
            renderWeekCalendarBody(this.calendar.week);
        },
    };
    new Events();
}

document.addEventListener("DOMContentLoaded", function () {
    const eventsDom = document.querySelector('#sundance-events');
    if(eventsDom){
        const { events } = JSON.parse(eventsDom.dataset.events);
        if(events && events.length > 0){
         initEvents(events);
         eventsDom.dataset.events = "";
        }
    }
 })
