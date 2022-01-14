
class Modal extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({
      mode: "open",
    });
    this.closeEvent = null;
  }

  close () {  
    this.shadow.querySelector(".wrapper").classList.remove("show");
    this.dispatchEvent(new CustomEvent("modal-close", {}));
  };

  open () {
    this.shadow.querySelector(".wrapper").classList.add("show");
    this.dispatchEvent(new CustomEvent("modal-open", {}));
  };

  toggleModal () {
    if(this.shadow.querySelector(".wrapper").classList.contains("show")){
        this.close();
    }else{
        this.open();
    }
  };

  connectedCallback() {
    this.render();
    this.initEvents();
  }

  disconnectedCallback() {
      document.removeEventListener(this.closeEvent);
  }

  render() {
    this.shadow.innerHTML = `
    <style>
      .wrapper {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 9999;
        overflow: auto;
        -webkit-overflow-scrolling: touch;
        display: none;
      }
      .wrapper.show {
        display: block;
      }
      .modal {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: white;
        padding: 2.6rem;
        min-width: 18rem;
        min-height: 10rem;
        max-height: 85vh;
        max-width: 90%;
        box-shadow: rgb(46 44 41 / 10%) 0 0 4px, rgb(46 44 41 / 10%) 0 4px 22px;
        border-radius: 0rem;
        overflow-y: auto;
      }
      .modal__close {
        position: absolute;
        top: 1rem;
        right: 1rem;
        cursor: pointer;
        font-size: 3rem;
        color: #9d9c9c;
      }
      .modal__close:hover {
        opacity: 0.5;
      }
      .modal__close:active {
        opacity: 0.2;
      }
    </style>
    <div class="wrapper">
        <div class="modal">
            <div id="modal__close" class="modal__close">&times;</div>
            <slot></slot>
        </div>
    </div>
    `;
  }

  initEvents(){
    setTimeout(() => {
        this.closeEvent = this.shadow.addEventListener("click", (e) => {
            e.preventDefault();
            if(e.target.id == 'modal__close'){
                this.close();
            }
        })
    }, 200)
  }

}

customElements.define("global-modal", Modal);