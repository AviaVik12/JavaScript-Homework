class Validator {
    constructor(form) {
        this.patterns = {
            name: /^[a-zа-яё]+$/i,
            phone: /^\+7\(\d{3}\)\d{3}-\d{4}$/,
            email: /^[\w.-]+@\w+\.[a-z]{2,5}$/i
        };

        this.errors = {
            name: "Name must contain letters only!",
            phone: "Phone number must be based on +7(000)000-0000 template",
            email: "Email must be based on mail@mail.ru template"
        };

        this.errorClass = 'errorMessage';
        this.form = form;
        this.valid = false;
        this._validateForm();
    }

    validate(regex, value) {
        regex.test(value);
    }

    _validateForm() {
        let errors = [...document
            .getElementById(this.form)
            .querySelectorAll(`.${this.errorClass}`)
        ];
        for (let error of errors) {
            error.remove();
        }

        let formFields = [...document
            .getElementById(this.form)
            .getElementsByTagName('input')
        ];
        for (let field of formFields) {
            this._validate(field);
        }

        if (![...document
            .getElementById(this.form)
            .querySelectorAll('.invalid')
        ].length) {
            this.valid = true;
        }
    }

    _validate(field) {
        if (this.patterns[field.name]) {
            if (!this.patterns[field.name].test(field.value)) {
                field.classList.add('invalid');
                this._addErrorMessage(field);
                this._watchField(field);
            }
        }
    }

    _addErrorMessage(field) {
        let error = `
            <div class="${this.errorClass}">
                ${this.errors[field.name]}
            </div> 
        `;

        field.parentNode.insertAdjacentHTML(
            'beforeend', error
        );
    }

    _watchField(field) {
        field.addEventListener('input', () => {
            let error = field.parentNode.querySelector(
                `.${this.errorClass}`
            );

            if (this.patterns[field.name].test(field.value)) {
                field.classList.remove('invalid');
                field.classList.add('valid');

                if (error) {
                    error.remove();
                }
            } else {
                field.classList.remove('valid');
                field.classList.add('invalid');

                if (!error) {
                    this._addErrorMessage(field);
                }
            }
        });
    }
}