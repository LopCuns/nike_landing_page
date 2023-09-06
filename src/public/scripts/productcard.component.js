"use strict";
const template = document.createElement('template');
template.innerHTML = `
<article class="productcard">
  <div class="productcard__info">
    <slot name="info__text" class="productcard__info__text"><span>acronym x nike</span><span>air presto mid "dynamic yellow"</span></slot>
    <div class="productcard__info__prices">
      <slot name="price__now" class="productcard__info__prices__now"></slot>
      <slot name="price__before" class="productcard__info__prices__before"></slot>
    </div>
    <a href="#" class="productcard__buy">buy now +</a>
    <div class="productcard__colors">
      <div class="productcard__colors__color"></div>
      <div class="productcard__colors__color"></div>
      <div class="productcard__colors__color"></div>
    </div>
  </div>
  <slot name="productcard__img" class="productcard__img"></slot>
</article>

`;
class ProductCardComponent extends HTMLElement {
    constructor() {
        super();
        this.template = template.content.cloneNode(true);
        this.stylesheet = `*,::after,::before{box-sizing:border-box;}:host{--color1:red;--color2:blue;--color3:green;}.productcard{position:relative;width:18rem;height:16rem;padding:.5rem;border:3px dashed #0c3f6c;text-transform:uppercase}.productcard__info{display:flex;flex-flow:column wrap;justify-content:center;align-items:flex-start;width:100%;height:100%;gap:1rem}.productcard__info__text{display:flex;flex-flow:column wrap;justify-content:center;align-items:flex-start;font-size:1rem}.productcard__info__prices{display:flex;flex-flow:row wrap;justify-content:center;align-items:center}.productcard__info__prices__now{font-size:2.5rem;color:#0c3f6c}.productcard__info__prices__before::slotted(*){font-size:1.5rem;text-decoration:line-through;color:#ccc}.productcard__buy{font-size:.8rem;color:#c57f99;text-decoration:none;}.productcard__colors{display:flex;flex-flow:row wrap;justify-content:center;align-items:center;padding:.5rem;gap:1rem}.productcard__colors__color{width:1rem;height:1rem;background-color:red}.productcard__colors__color:nth-of-type(1){background-color:var(--color1)}.productcard__colors__color:nth-of-type(2){background-color:var(--color2)}.productcard__colors__color:nth-of-type(3){background-color:var(--color3)}.productcard__img::slotted(img){position:absolute;bottom:0;right:-2rem;height:7rem;}`;
        this.attachShadow({ mode: 'open' });
    }
    connectedCallback() {
        var _a, _b, _c;
        // Change the color to be the selected ones
        const colors = (_a = this.getAttribute('data-colors')) === null || _a === void 0 ? void 0 : _a.split('|');
        if (colors[0])
            this.style.setProperty('--color1', colors[0]);
        if (colors[1])
            this.style.setProperty('--color2', colors[1]);
        if (colors[2])
            this.style.setProperty('--color3', colors[2]);
        // Insert the template content in the shadow dom
        (_b = this.shadowRoot) === null || _b === void 0 ? void 0 : _b.appendChild(this.template);
        // Insert the styles in the shadow dom
        const $style = document.createElement('style');
        $style.textContent = this.stylesheet;
        (_c = this.shadowRoot) === null || _c === void 0 ? void 0 : _c.appendChild($style);
    }
}
customElements.define('product-card', ProductCardComponent);
