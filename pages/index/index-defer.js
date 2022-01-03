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
    console.log(events);
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
        console.log("weekNext", weekNext);
        self.init();
        self._onClick = function (e) {
            e = e || window.event;
            var target = e.target || e.srcElement,
                pEl = target;

            if (!target) {
                return;
            }
            console.log("target", target.classList);
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
const events = [
    {
        date: "2021/12/3",
        time: "8:00 pm - 11:00 pm",
        image: {
            global_image: {
                alt: "Live music in the Owl Bar featuring George Brown Quintet.",
                src: "",
                types: ["jpg"],
                background: true,
                intrinsicwidth: 0,
                intrinsicheight: 0,
            },
        },
        title: "Owl Bar: Live Music",
        description:
            "<p>Live music in the Owl Bar featuring George Brown Quintet.</p>",
        jsDate: "2021-12-02T18:00:00.000Z",
        _id: "1638468000000owl-bar-live-music",
    },
    {
        date: "2021/12/4",
        time: "8:00 pm – 11:00 pm",
        image: {
            global_image: {
                alt: "",
                src: "",
                background: true,
                intrinsicwidth: 0,
                intrinsicheight: 0,
            },
        },
        title: "Owl Bar: Live Music",
        description:
            "<p>Live music in the Owl Bar featuring Halladay Quist.</p>",
        jsDate: "2021-12-03T18:00:00.000Z",
        _id: "1638554400000owl-bar-live-music",
    },
    {
        date: "2021/12/8",
        time: "9:00 am – 5:00 pm",
        image: {
            global_image: {
                alt: "",
                src: "",
                background: true,
                intrinsicwidth: 0,
                intrinsicheight: 0,
            },
        },
        title: "Opening of Outlaw Express",
        description:
            "<p>The opening of Outlaw Express will be modified on Wednesday, December 22nd due to the need for 2-3 more days of snowmaking temperatures and/or significant natural snow. The lift is operational and will open for scenic lift rides for season pass holders from 11 am - 2 pm. The new beginner area with 3 magic carpets will be open for ski lessons and pass holders. Additionally, our new modern BBQ restaurant, The Lookout, will open from 10:30 am - 3:30 pm. We will celebrate the grand opening of Outlaw Express and The Lookout with ribbon cutting at 11 am. Come for churros, music, hot cocoa, coffee, and prizes! ⁠</p><p>⁠</p><p>Our snowmaking efforts were initially focused on the terrain around Jakes lift for opening last Saturday. Due to the impact of the current inversion snowmaking has not been productive on the front mountain, however the upcoming storm cycle looks to push out the inversion with significant snowfall and colder temperatures on the way. Scenic lift rides will continue on Outlaw Express for season pass holders until the lift opens for skiing.⁠</p><p>⁠</p><p>We are excited for skiing and boarding on the back mountain as well which will be possible with an additional 6-8” of natural snow. Please watch our social media channels for updates on all openings which we will provide by 5 pm everyday until we open for skiing on Outlaw Express and the back mountain.</p>",
        jsDate: "2021-12-07T18:00:00.000Z",
        _id: "1638900000000opening-of-outlaw-express",
    },
    {
        date: "2021/12/11",
        time: "12:00 pm – 5:00 pm",
        image: {
            global_image: {
                alt: "Visiting Artists: Megan Ah You & Phil Ah You",
                src: "stage/upload/sundance/sundance/8f4f22ac8183e7a1-event.jpg",
                sizes: [
                    {
                        src: "",
                        view: "100",
                        media: "(min-width:100px)",
                        intrinsicwidth: 0,
                        intrinsicheight: 0,
                    },
                ],
                types: ["webp", "jpg"],
                background: false,
                intrinsicwidth: 1400,
                intrinsicheight: 1038,
            },
        },
        title: "Visiting Artists: Megan Ah You & Phil Ah You",
        description:
            "<p>20 years of living together will change a girl, and a guy, and their artwork…</p><p>Phil is a designer, and Megan is a painter. This is the first time they have shown their work together. This show came about when looking at their respective artworks side by side and realizing how much their artwork had evolved over the years, to resemble one another’s style. Phil’s posterized digital prints are created in the works progress style of vintage National Parks posters that became popular toward the end of the great depression era. Megan’s stylized, acrylic, landscape paintings became cleaner and more simplified throughout the last 2 years. The result is a group of artworks that carry similarities, despite difference in background and medium used by the individual artists. The paintings and the digital prints were created out of a mutual desire to express connection to the land. Specifically, connection to the rich Utah landscape that Phil and Megan enjoy, and have made their home.</p><p><br></p><p>Phil has a BFA in graphic design and works as a technician for UVU’s Art Dept.</p><p><br></p><p>Megan has a BFA in painting and works as Director of Art for Encircle, a local non-profit organization benefiting lgbtq youth. The couple both continue to utilize creating artworks, like the one’s featured here, as an outlet for expression and visual communication.</p>",
        jsDate: "2021-12-10T18:00:00.000Z",
        _id: "1639159200000visiting-artists-megan-ah-you--phil-ah-you",
    },
    {
        date: "2021/12/11",
        time: "8:00 pm – 11:00 pm",
        image: {
            global_image: {
                alt: "",
                src: "",
                background: true,
                intrinsicwidth: 0,
                intrinsicheight: 0,
            },
        },
        title: "Owl Bar: Live Music",
        description:
            "<p>Live music in the Owl Bar featuring Michelle Moonshine &amp; Co.</p>",
        jsDate: "2021-12-10T18:00:00.000Z",
        _id: "1639159200000owl-bar-live-music",
    },
    {
        date: "2021/12/17",
        time: "5:00 pm – 9:00 pm",
        image: {
            global_image: {
                alt: "",
                src: "",
                background: true,
                intrinsicwidth: 0,
                intrinsicheight: 0,
            },
        },
        title: "Full Moon Cross Country Ski + Snowshoe",
        acitons: [
            {
                action: {
                    url: "/winter-activities/nordic-center/",
                    copy: "BOOK NOW",
                    icon: "",
                    type: "primary",
                    category: "link",
                    internal: true,
                },
            },
        ],
        actions: [
            {
                action: {
                    url: "/winter-activities/nordic-center/",
                    copy: "Book Now",
                    icon: "",
                    type: "primary",
                    category: "link",
                    internal: true,
                },
            },
        ],
        description:
            '<p><span style="color: rgb(45, 46, 47);">Cross country ski or snowshoe by the light of the full moon. Plan a fun family experience or a unique date night exploring our amazing wooded trails. This is an unguided event so you are free to roam the trails at your leisure. Headlamps are recommended and are available to rent. Intermediate to Advanced skiers only.</span></p>',
        jsDate: "2021-12-16T18:00:00.000Z",
        _id: "1639677600000full-moon-cross-country-ski--snowshoe",
    },
    {
        date: "2022/1/1",
        time: "5:30 p.m. – 7:30 p.m.",
        image: {
            global_image: {
                alt: "",
                src: "",
                background: true,
                intrinsicwidth: 0,
                intrinsicheight: 0,
            },
        },
        title: "Holiday Happenings",
        description:
            "<p><em>For Sundance Resort lodging guests only.</em>&nbsp;Enjoy s’more making, hot chocolate, apple cider, board games, ping pong, foosball, and a daily Holiday craft in the Screening Room. Please refer to email to book craft times or ask the front desk for details.</p><p><br></p><p><strong>Daily Craft Time:</strong>&nbsp;5:30 p.m. – 7:30 p.m.</p><p><br></p><p>*Sunday, December 26 – Soda Gnome Bottles</p><p>*Monday, December 27 – Pine Cone Trees – Ornaments</p><p>*Tuesday, December 28 – Holiday Paper Lanterns</p><p>*Wednesday, December 29 – Dried Orange Ornaments</p><p>*Thursday, December 30 – Painting Wooden Nutcrackers</p><p>*Friday, December 31 – Sugar Cookie Frosting</p><p>*Saturday, January 1 – Yarn Garlands</p><p><br></p><p><em>*Please note this is not a babysitting service, all children must be accompanied by a parent or an adult at all times</em></p>",
        jsDate: "2021-12-31T18:00:00.000Z",
        _id: "1640973600000holiday-happenings",
    },
];
initEvents(events);
// document.addEventListener("DOMContentLoaded", function () {
//     const eventsDom = document.querySelector('#sundance-events');
//     if(eventsDom){
//         const { events } = JSON.parse(eventsDom.dataset.events);
//         if(events && events.length > 0){
//          initEvents(events);
//          eventsDom.dataset.events = "";
//         }
//     }
//  })
