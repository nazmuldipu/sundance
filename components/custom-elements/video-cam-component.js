import ProgressiveElement from "../progressive-element.js";

export default class VideoCam extends ProgressiveElement{
    constructor() {
        super([
          {
            id: "violet",
            behaviorPath: "//js.prismcam.com/violet.js", // have to use relative path
            stylePath: "//js.prismcam.com/violet.css",
            type: "IntersectionObserver",
            observerConfig: {
              rootMargin: "400px",
            },
          },
        ]);
      }

        // assuming use of IntersectionObserver
  _onLoad(moduleId, entries, observer) {
    if (entries.some((entry) => entry.isIntersecting)) {
      super._onLoad(moduleId).then(( res ) => {
        const mod = res[1];
        console.log(mod);
      });
    }
  }
}

customElements.define("video-cam", VideoCam);