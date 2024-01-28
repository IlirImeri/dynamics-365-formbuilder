class FormBuilder {

    constructor(containerId, formConfig) {
        this.container = document.getElementById(containerId);
        this.table = document.createElement("table");
        this.container.appendChild(this.table);

        this.rows = formConfig.rows || 1;
        this.columns = formConfig.columns || 1;

        for (let i = 0; i < this.rows; i++) {
            const row = this.table.insertRow();

            for (let j = 0; j < this.columns; j++) {
                row.insertCell();
            }
        }

        if (formConfig && formConfig.fields) {
            formConfig.fields.forEach(fieldConfig => this.addField(fieldConfig));
        }
    
        if (formConfig && formConfig.buttons) {
            formConfig.buttons.forEach(button => this.addButton(button));
        }

    }

    addField( fieldConfig ) {
        const { rowIndex, columnIndex } = fieldConfig;
        const row = this.table.rows[rowIndex];
        const cell = row.cells[columnIndex];

        if (fieldConfig.type !== "lookup") {
            const label = addLabel(fieldConfig);
            cell.appendChild(label);
        }

        let input
        let err = null;
        
        switch (fieldConfig.type) {
            case "text":
                input = document.createElement("input");
                input.id = fieldConfig.id; //string - required
                input.type = fieldConfig.type; //string - required
                input.value = fieldConfig.value || ""; //string - required
                input.placeholder = fieldConfig.placeholder || ""; //string - optional
                input.minLength = fieldConfig.minLength || 0; // int - optional
                input.maxLength = fieldConfig.maxLength || 2048; // int - optional
                input.disabled = fieldConfig.disabled || false; // bool - optional
                input.className = 'general-field';
                //err = displayError("Missing Value");
                break;

            case "number":
                input = document.createElement("input");
                input.id = fieldConfig.id; // string
                input.type = fieldConfig.type; // string
                input.value = fieldConfig.value || ""; // string
                input.min = fieldConfig.min || -2147483648; // number - optional
                input.max = fieldConfig.max || 2147483648; // number - optional
                input.step = fieldConfig.step || ""; //string - required
                input.placeholder = fieldConfig.placeholder || 0; // number - optional
                input.disabled = fieldConfig.disabled || false; // bool - optional
                input.className = 'general-field';
                break;

            case "boolean":
                input = document.createElement("select");
                input.id = fieldConfig.id;
                const options = [
                    { value: "true", displayName: fieldConfig.trueDisplayName || "True" },
                    { value: "false", displayName: fieldConfig.falseDisplayName || "False" }
                ];

                options.forEach(option => {
                    const optionElement = document.createElement("option");
                    optionElement.value = option.value;
                    optionElement.text = option.displayName;
                    input.appendChild(optionElement);
                });
                input.disabled = fieldConfig.disabled || false;
                input.className = 'general-field select-field';
                break;

            case "select":
                input = document.createElement("select");
                input.id = fieldConfig.id;

                fieldConfig.options.forEach(option => {
                    const optionElement = document.createElement("option");
                    optionElement.value = option.entityName + "-" + option.id    
                    optionElement.text = option.displayName;
                    optionElement.selected = option.selected || false;
                    optionElement.disabled = option.disabled || false;
                    input.appendChild(optionElement);
                });
                input.disabled = fieldConfig.disabled || false;
                input.className = 'general-field select-field';
                break;

            case "date":
            case "datetime-local":
                input = document.createElement("input");
                input.type = fieldConfig.type;
                input.id = fieldConfig.id;
                input.value = fieldConfig.value || "";
                input.disabled = fieldConfig.disabled || false;
                input.placeholder = fieldConfig.placeholder || "";
                input.min = fieldConfig.min || "";
                input.max = fieldConfig.max || "";
                input.className = 'general-field';
                break;

            case "textarea":
                input = document.createElement("textarea");
                input.id = fieldConfig.id;
                input.value = fieldConfig.value || "";
                input.placeholder = fieldConfig.placeholder || "";
                input.rows = fieldConfig.rows || "";
                input.cols = fieldConfig.cols || "";
                input.disabled = fieldConfig.disabled || false;
                input.className = 'textarea-field';
                break;

           case "lookup":
                input = document.createElement('div');
                input.className = 'input-container';

                const label = addLabel(fieldConfig);
                label.setAttribute("for", fieldConfig.id);

                const inputWithIcon = document.createElement('div');
                inputWithIcon.className = 'input-with-icon';

                const inputElement = document.createElement('input');
                inputElement.type = 'text';
                inputElement.id = fieldConfig.id; // Use the provided ID for the input
                inputElement.value = fieldConfig.value || "";
                inputElement.name = fieldConfig.name || fieldConfig.id; // Use the provided name or fallback to ID
                inputElement.className = 'general-field styled-input';
                if (fieldConfig.disabled) {
                    inputElement.disabled = true;
                }
                    
                const searchIcon = document.createElement('div');
                searchIcon.className = 'search-icon';

                const svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                svgElement.setAttribute('width', '16');
                svgElement.setAttribute('height', '16');
                svgElement.setAttribute('viewBox', '0 0 16 16');

                const pathElement = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                pathElement.setAttribute('fill', '#444');
                pathElement.setAttribute('d', 'M15.7 14.3l-4.2-4.2c-0.2-0.2-0.5-0.3-0.8-0.3 0.8-1 1.3-2.4 1.3-3.8 0-3.3-2.7-6-6-6s-6 2.7-6 6 2.7 6 6 6c1.4 0 2.8-0.5 3.8-1.4 0 0.3 0 0.6 0.3 0.8l4.2 4.2c0.2 0.2 0.5 0.3 0.7 0.3s0.5-0.1 0.7-0.3c0.4-0.3 0.4-0.9 0-1.3zM6 10.5c-2.5 0-4.5-2-4.5-4.5s2-4.5 4.5-4.5 4.5 2 4.5 4.5-2 4.5-4.5 4.5z');

                svgElement.appendChild(pathElement);

                searchIcon.appendChild(svgElement);

                inputWithIcon.appendChild(inputElement);
                inputWithIcon.appendChild(searchIcon);

                input.appendChild(label);
                input.appendChild(inputWithIcon);

                // Add click event for the lookup functionality
                inputElement.addEventListener('click', function () {
                    if (fieldConfig.onLookupClick) {
                        fieldConfig.onLookupClick(fieldConfig.id);
                    }
                });

                if (!fieldConfig.disabled) {
                    // Optionally, add click event to the search icon as well
                    searchIcon.addEventListener('click', function () {
                        if (fieldConfig.onLookupClick) {
                            fieldConfig.onLookupClick(fieldConfig.id);
                        }
                    });
                }

               
              break;


            default:
                console.error("Unsupported field type: " + fieldConfig.type);
                return;
        }

        // Attach events if specified
        if (fieldConfig.events) {
            for (const eventType in fieldConfig.events) {
                if (fieldConfig.events.hasOwnProperty(eventType)) {
                    input.addEventListener(eventType, fieldConfig.events[eventType]);
                }
            }
        }

        cell.appendChild(input);
        if (err !== null) {
            cell.appendChild(err);   
        }

    }
}

function addLabel(fieldConfig) {

    const label = document.createElement("label");
    label.className = 'label-container';
    label.innerHTML = fieldConfig.label ;
        
    if (fieldConfig.disabled){
        var spanElement = document.createElement("span");
        spanElement.id = "iconContainer"; // Set an ID for easy reference if needed

        var svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svgElement.setAttribute("width", "16px");
        svgElement.setAttribute("height", "16px");
        svgElement.setAttribute("viewBox", "0 0 24 24");
        svgElement.setAttribute("fill", "none");

        var iconGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
        iconGroup.setAttribute("id", "SVGRepo_iconCarrier");

        var pathElement = document.createElementNS("http://www.w3.org/2000/svg", "path");
        pathElement.setAttribute("d", "M12 14.5V16.5M7 10.0288C7.47142 10 8.05259 10 8.8 10H15.2C15.9474 10 16.5286 10 17 10.0288M7 10.0288C6.41168 10.0647 5.99429 10.1455 5.63803 10.327C5.07354 10.6146 4.6146 11.0735 4.32698 11.638C4 12.2798 4 13.1198 4 14.8V16.2C4 17.8802 4 18.7202 4.32698 19.362C4.6146 19.9265 5.07354 20.3854 5.63803 20.673C6.27976 21 7.11984 21 8.8 21H15.2C16.8802 21 17.7202 21 18.362 20.673C18.9265 20.3854 19.3854 19.9265 19.673 19.362C20 18.7202 20 17.8802 20 16.2V14.8C20 13.1198 20 12.2798 19.673 11.638C19.3854 11.0735 18.9265 10.6146 18.362 10.327C18.0057 10.1455 17.5883 10.0647 17 10.0288M7 10.0288V8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8V10.0288");
        pathElement.setAttribute("stroke", "#000000");
        pathElement.setAttribute("stroke-width", "1.248");
        pathElement.setAttribute("stroke-linecap", "round");
        pathElement.setAttribute("stroke-linejoin", "round");

        iconGroup.appendChild(pathElement);

        svgElement.appendChild(iconGroup);

        spanElement.appendChild(svgElement);

        label.innerHTML = fieldConfig.label;
        label.appendChild(spanElement)
        return label
    }

    if (fieldConfig.required) {
        label.innerHTML = fieldConfig.label + '<span style="color: red;">*</span>';
    }

    return label;
}

function displayError( errorMessage ) {
    const errParagraph = document.createElement("p");
    errParagraph.className = 'inputError';
    errParagraph.innerHTML = errorMessage ;

    return errParagraph;
}