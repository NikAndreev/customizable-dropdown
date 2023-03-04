class Dropdown {
	constructor(dropdown, config) {
		this.dropdown = dropdown	
		this.dropdownSelector = config.dropdownSelector
    this.dropdownActiveClass = config.dropdownActiveClass || ''
		this.header = this.dropdown.querySelector(config.headerSelector)
		this.headerActiveClass = config.headerActiveClass || ''
		this.list = this.dropdown.querySelector(config.listSelector)
		this.listActiveClass = config.listActiveClass || ''
		this.itemSelector = config.itemSelector
		this.itemActiveClass = config.itemActiveClass || ''
		this.items = this.dropdown.querySelectorAll(this.itemSelector)

		this.isSelect = config.isSelect || false

		if (this.isSelect) {
			this.input = this.dropdown.querySelector(config.inputSelector)
		}

		if (typeof config.on === 'object') {
			this._setCallbacks(config.on)
		}

		this.toggle = this.toggle.bind(this)
		this._open = this._open.bind(this)
		this._close = this._close.bind(this)
		this._documentClickHandler = this._documentClickHandler.bind(this)
		this._listClickHandler = this._listClickHandler.bind(this)

		this._setHeaderClickHandler()
		this._setListClickHandler()

		if (this._onInit) {
			this._onInit()
		}

		this.toggle(config.isActive || false)

		if (this.isSelect) {
			this.select(config.value)
		}
	}

	toggle(isActive) {
		this.isActive = isActive
		isActive ? this._open() : this._close()
	}

	select(value) {
		this.value = value
		this.input.value = value

		this.items.forEach(item => {
			if (item.dataset.value === value) {
				item.classList.add(this.itemActiveClass)
				this.header.innerText = item.dataset.text
			} else {
				item.classList.remove(this.itemActiveClass)
			}
		})

		if (this._onSelect) {
			this._onSelect()
		}
	}

	_close() {
		this.dropdown.classList.remove(this.dropdownActiveClass)
		this.header.classList.remove(this.headerActiveClass)
		this.list.classList.remove(this.listActiveClass)

		this._removeDocumentClickHandler()

		if (this._onClose) {
			this._onClose()
		}
	}

	_open() {
		this.dropdown.classList.add(this.dropdownActiveClass)
		this.header.classList.add(this.headerActiveClass)
		this.list.classList.add(this.listActiveClass)

		this._setDocumentClickHandler()

		if (this._onOpen) {
			this._onOpen()
		}
	}

	_setHeaderClickHandler() {
		this.header.addEventListener('click', () => this.toggle(!this.isActive))
	}

	_setDocumentClickHandler() {
    document.addEventListener('click', this._documentClickHandler)
  }

  _removeDocumentClickHandler() {
    document.removeEventListener('click', this._documentClickHandler)
  }

	_documentClickHandler(e) {
		const dropdown = e.target.closest(this.dropdownSelector)
		
    if (!dropdown || dropdown !== this.dropdown) {
      this.toggle(false)
    }
  }

	_setListClickHandler() {
		this.list.addEventListener('click', this._listClickHandler)
	}

	_listClickHandler(e) {
		const item = e.target.closest(this.itemSelector)

		if (item) {
			if (this.isSelect) {
				this.select(item.dataset.value)
			}

			this.toggle(false)
		}
	}

	_setCallbacks(config) {
		if (typeof config.init === 'function') {
			this._onInit = config.init
		}

		if (typeof config.open === 'function') {
			this._onOpen = config.open
		}

		if (typeof config.close === 'function') {
			this._onClose = config.close
		}

		if (typeof config.select === 'function') {
			this._onSelect = config.select
		}
	}
}


new Dropdown(document.querySelector('[data-dropdown]'), {
	isActive: false,
	dropdownSelector: '[data-dropdown]',
	dropdownActiveClass: 'active',
	headerSelector: '[data-dropdown-header]',
	headerActiveClass: 'active',
	listSelector: '[data-dropdown-list]',
	listActiveClass: 'active',
	itemSelector: '[data-dropdown-item]'
})



const customSelect = new Dropdown(document.querySelector('[data-select]'), {
	isSelect: true,
	value: '', // если isSelect, то поле обязательно
	inputSelector: '[data-select-input]', // если isSelect, то поле обязательно
	dropdownSelector: '[data-select]',
	dropdownActiveClass: 'active',
	headerSelector: '[data-select-header]',
	headerActiveClass: 'active',
	listSelector: '[data-select-list]',
	listActiveClass: 'active',
	itemSelector: '[data-select-item]',
	itemActiveClass: 'active',
	on: {
		init: function () {
			console.log('Dropdown initialized');
		},
		open: function () {
			console.log('Dropdown opened');
		},
		close: function () {
			console.log('Dropdown closed');
		},
		select: function () {
			console.log(this.value + ' selected');
		},
	}
})

