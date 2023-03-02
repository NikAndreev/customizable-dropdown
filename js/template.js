class Dropdown {
	constructor(dropdown, config) {
		this.dropdown = dropdown	
    this.dropdownActiveClass = config.dropdownActiveClass
		this.header = this.dropdown.querySelector(config.header)
		this.headerActiveClass = config.headerActiveClass
		this.list = this.dropdown.querySelector(config.list)
		this.listActiveClass = config.listActiveClass

		this.toggle = this.toggle.bind(this)
		this.close = this.close.bind(this)

		this.header.addEventListener('click', this.toggle) 
	}

	toggle() {
		this.dropdown.classList.toggle(this.dropdownActiveClass)
		this.header.classList.toggle(this.headerActiveClass)
		this.list.classList.toggle(this.listActiveClass)
	}

	close() {
		this.dropdown.classList.remove(this.dropdownActiveClass)
		this.header.classList.remove(this.headerActiveClass)
		this.list.classList.remove(this.listActiveClass)
	}
	
}
	

document.querySelectorAll('[data-dropdown]').forEach( dropdown => {
	new Dropdown(dropdown, {
		dropdownActiveClass: 'active',
		header: '[data-dropdown-header]',
		headerActiveClass: 'active',
		list: '[data-dropdown-list]',
		listActiveClass: 'active'
	})
})


