function setupEditor() {
  const HuiViewEditor = customElements.get('hui-view-editor')
  const { hass } = document.querySelector('home-assistant')

  const firstUpdated = HuiViewEditor.prototype.firstUpdated
  HuiViewEditor.prototype.firstUpdated = function () {
    firstUpdated?.bind(this)()

    const oldSchema = this._schema
    this._schema = (localize) => {
      const schema = oldSchema.call(this, localize)
      if (schema.find((e) => e.name === 'area_background') === undefined)
        schema.push({
          name: 'area_background',
          selector: {
            select: {
              mode: 'dropdown',
              options: [
                { value: '', label: '' },
                ...Object.values(hass.areas).map((area) => ({
                  value: area.area_id,
                  label: area.name,
                })),
              ],
            },
          },
        })
      return schema
    }

    const oldComputeLabel = this._computeLabel
    this._computeLabel = (schema) => {
      switch (schema.name) {
        case 'area_background':
          return 'Area Background'
        default:
          return oldComputeLabel(schema)
      }
    }

    this.requestUpdate()
  }
}

function setupStyles(layout) {
  const id = 'area-background-styles'
  if (layout.querySelector(`#${id}`)) return

  const styleElement = document.createElement('style')
  styleElement.id = id
  styleElement.innerHTML = `
    #area-background {
      position: fixed;
      inset: 0;
      opacity: 0.4;
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
      filter: blur(10px);
    }
    #view, hui-view {
      background: none!important;
    }
  `
  layout.prepend(styleElement)
}

function getBackgroundElement(layout) {
  const id = 'area-background'
  let backgroundElement = layout.querySelector(`#${id}`)
  if (backgroundElement) return backgroundElement

  backgroundElement = document.createElement('div')
  backgroundElement.id = id
  layout.prepend(backgroundElement)
  return backgroundElement
}

function setBackground(element, url) {
  element.style.display = 'block'
  element.style.backgroundImage = `url('${url}')`
}

function unsetBackground(element) {
  element.style.display = 'none'
}

function maybeSetBackground(hass) {
  const lovelacePanel = document
    .querySelector('home-assistant')
    .shadowRoot.querySelector('home-assistant-main')
    .shadowRoot.querySelector('ha-panel-lovelace')

  // Current view is not a lovelace view
  if (!lovelacePanel) return

  const { lovelace } = lovelacePanel
  const layout = lovelacePanel.shadowRoot.querySelector('hui-root').shadowRoot.firstElementChild
  const currentView = window.location.pathname.split('/').pop()
  const viewConfig = isNaN(currentView)
    ? lovelace.config.views.find((v) => v.path === currentView)
    : lovelace.config.views[+currentView]
  const areaBackground = viewConfig?.area_background

  setupStyles(layout)
  const backgroundElement = getBackgroundElement(layout)

  if (areaBackground) {
    setBackground(backgroundElement, hass.areas[areaBackground].picture)
  } else {
    unsetBackground(backgroundElement)
  }
}

function start() {
  const { hass } = document.querySelector('home-assistant')

  maybeSetBackground(hass)

  let url = location.href
  document.body.addEventListener('click', () => {
    requestAnimationFrame(() => {
      if (url !== location.href) {
        maybeSetBackground(hass)
        url = location.href
      }
    })
  })

  window.addEventListener('popstate', () => {
    maybeSetBackground(hass)
    url = location.href
  })
}

customElements.whenDefined('hui-view').then(start)
customElements.whenDefined('hui-view-editor').then(setupEditor)
