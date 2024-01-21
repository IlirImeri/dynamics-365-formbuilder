"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
    }
    addField(fieldConfig) {
        const { rowIndex, columnIndex } = fieldConfig;
        const row = this.table.rows[rowIndex];
        const cell = row.cells[columnIndex];
        // Add label
        if (fieldConfig.type !== "lookup") {
            const label = document.createElement("label");
            label.innerHTML = fieldConfig.label;
            if (fieldConfig.required) {
                label.innerHTML = fieldConfig.label + '<span style="color: red;">*</span>';
            }
            if (fieldConfig.disabled) {
                // Create a new span element
                var spanElement = document.createElement("span");
                spanElement.id = "iconContainer"; // Set an ID for easy reference if needed
                // Create an SVG element
                var svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                svgElement.setAttribute("width", "16px");
                svgElement.setAttribute("height", "16px");
                svgElement.setAttribute("viewBox", "0 0 24 24");
                svgElement.setAttribute("fill", "none");
                // Create a group for the icon
                var iconGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
                iconGroup.setAttribute("id", "SVGRepo_iconCarrier");
                // Create the path element with the provided data
                var pathElement = document.createElementNS("http://www.w3.org/2000/svg", "path");
                pathElement.setAttribute("d", "M12 14.5V16.5M7 10.0288C7.47142 10 8.05259 10 8.8 10H15.2C15.9474 10 16.5286 10 17 10.0288M7 10.0288C6.41168 10.0647 5.99429 10.1455 5.63803 10.327C5.07354 10.6146 4.6146 11.0735 4.32698 11.638C4 12.2798 4 13.1198 4 14.8V16.2C4 17.8802 4 18.7202 4.32698 19.362C4.6146 19.9265 5.07354 20.3854 5.63803 20.673C6.27976 21 7.11984 21 8.8 21H15.2C16.8802 21 17.7202 21 18.362 20.673C18.9265 20.3854 19.3854 19.9265 19.673 19.362C20 18.7202 20 17.8802 20 16.2V14.8C20 13.1198 20 12.2798 19.673 11.638C19.3854 11.0735 18.9265 10.6146 18.362 10.327C18.0057 10.1455 17.5883 10.0647 17 10.0288M7 10.0288V8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8V10.0288");
                pathElement.setAttribute("stroke", "#000000");
                pathElement.setAttribute("stroke-width", "1.248");
                pathElement.setAttribute("stroke-linecap", "round");
                pathElement.setAttribute("stroke-linejoin", "round");
                // Append the path element to the group
                iconGroup.appendChild(pathElement);
                // Append the group to the SVG element
                svgElement.appendChild(iconGroup);
                // Append the SVG element to the span
                spanElement.appendChild(svgElement);
                label.innerHTML = fieldConfig.label;
                label.appendChild(spanElement);
            }
            cell.appendChild(label);
        }
        // Add input based on field type
        let input;
        switch (fieldConfig.type) {
            case "text":
                input = document.createElement("input");
                input.id = fieldConfig.id;
                input.type = fieldConfig.type;
                input.value = fieldConfig.value || "";
                input.placeholder = fieldConfig.placeholder || "";
                input.maxLength = fieldConfig.maxLength || "";
                input.disabled = fieldConfig.disabled || false;
                break;
            case "number":
                input = document.createElement("input");
                input.id = fieldConfig.id;
                input.type = fieldConfig.type;
                input.value = fieldConfig.value || "";
                input.min = fieldConfig.min || "";
                input.max = fieldConfig.max || "";
                input.step = fieldConfig.step || "";
                input.placeholder = fieldConfig.placeholder || "";
                input.maxLength = fieldConfig.maxLength || "";
                input.disabled = fieldConfig.disabled || false;
                break;
            case "select":
                input = document.createElement("select");
                input.id = fieldConfig.id;
                fieldConfig.options.forEach(option => {
                    const optionElement = document.createElement("option");
                    optionElement.value = option;
                    optionElement.text = option;
                    input.appendChild(optionElement);
                });
                input.value = fieldConfig.value || "";
                input.disabled = fieldConfig.disabled || false;
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
                break;
            case "textarea":
                input = document.createElement("textarea");
                input.id = fieldConfig.id;
                input.value = fieldConfig.value || "";
                input.placeholder = fieldConfig.placeholder || "";
                input.rows = fieldConfig.rows || "";
                input.cols = fieldConfig.cols || "";
                input.disabled = fieldConfig.disabled || false;
                break;
            case "lookup":
                // Create the main container div
                input = document.createElement('div');
                input.className = 'input-container';
                let label = document.createElement("label");
                label.setAttribute("for", fieldConfig.id);
                //label.innerHTML = fieldConfig.label + (fieldConfig.required ? '<span style="color: red;">*</span>' : '');
                label.innerHTML = fieldConfig.label;
                if (fieldConfig.required) {
                    label.innerHTML = fieldConfig.label + '<span style="color: red;">*</span>';
                }
                if (fieldConfig.disabled) {
                    // Create a new span element
                    var spanElement = document.createElement("span");
                    spanElement.id = "iconContainer"; // Set an ID for easy reference if needed
                    // Create an SVG element
                    var svgElement1 = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                    svgElement1.setAttribute("width", "16px");
                    svgElement1.setAttribute("height", "16px");
                    svgElement1.setAttribute("viewBox", "0 0 24 24");
                    svgElement1.setAttribute("fill", "none");
                    // Create a group for the icon
                    var iconGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
                    iconGroup.setAttribute("id", "SVGRepo_iconCarrier");
                    // Create the path element with the provided data
                    var pathElement1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
                    pathElement1.setAttribute("d", "M12 14.5V16.5M7 10.0288C7.47142 10 8.05259 10 8.8 10H15.2C15.9474 10 16.5286 10 17 10.0288M7 10.0288C6.41168 10.0647 5.99429 10.1455 5.63803 10.327C5.07354 10.6146 4.6146 11.0735 4.32698 11.638C4 12.2798 4 13.1198 4 14.8V16.2C4 17.8802 4 18.7202 4.32698 19.362C4.6146 19.9265 5.07354 20.3854 5.63803 20.673C6.27976 21 7.11984 21 8.8 21H15.2C16.8802 21 17.7202 21 18.362 20.673C18.9265 20.3854 19.3854 19.9265 19.673 19.362C20 18.7202 20 17.8802 20 16.2V14.8C20 13.1198 20 12.2798 19.673 11.638C19.3854 11.0735 18.9265 10.6146 18.362 10.327C18.0057 10.1455 17.5883 10.0647 17 10.0288M7 10.0288V8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8V10.0288");
                    pathElement1.setAttribute("stroke", "#000000");
                    pathElement1.setAttribute("stroke-width", "1.248");
                    pathElement1.setAttribute("stroke-linecap", "round");
                    pathElement1.setAttribute("stroke-linejoin", "round");
                    // Append the path element to the group
                    iconGroup.appendChild(pathElement1);
                    // Append the group to the SVG element
                    svgElement1.appendChild(iconGroup);
                    // Append the SVG element to the span
                    spanElement.appendChild(svgElement1);
                    label.innerHTML = fieldConfig.label;
                    label.appendChild(spanElement);
                }
                // Create the input-with-icon div
                const inputWithIcon = document.createElement('div');
                inputWithIcon.className = 'input-with-icon';
                // Create the input element
                const inputElement = document.createElement('input');
                inputElement.type = 'text';
                inputElement.id = fieldConfig.id; // Use the provided ID for the input
                inputElement.value = fieldConfig.value || "";
                inputElement.name = fieldConfig.name || fieldConfig.id; // Use the provided name or fallback to ID
                inputElement.className = 'styled-input';
                if (fieldConfig.disabled) {
                    inputElement.disabled = true;
                }
                // Create the search icon div
                const searchIcon = document.createElement('div');
                searchIcon.className = 'search-icon';
                // Create the SVG element for the search icon
                const svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                svgElement.setAttribute('width', '16');
                svgElement.setAttribute('height', '16');
                svgElement.setAttribute('viewBox', '0 0 16 16');
                const pathElement = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                pathElement.setAttribute('fill', '#444');
                pathElement.setAttribute('d', 'M15.7 14.3l-4.2-4.2c-0.2-0.2-0.5-0.3-0.8-0.3 0.8-1 1.3-2.4 1.3-3.8 0-3.3-2.7-6-6-6s-6 2.7-6 6 2.7 6 6 6c1.4 0 2.8-0.5 3.8-1.4 0 0.3 0 0.6 0.3 0.8l4.2 4.2c0.2 0.2 0.5 0.3 0.7 0.3s0.5-0.1 0.7-0.3c0.4-0.3 0.4-0.9 0-1.3zM6 10.5c-2.5 0-4.5-2-4.5-4.5s2-4.5 4.5-4.5 4.5 2 4.5 4.5-2 4.5-4.5 4.5z');
                // Append the path element to the SVG element
                svgElement.appendChild(pathElement);
                // Append the SVG element to the search icon div
                searchIcon.appendChild(svgElement);
                // Append the input element and search icon to the input-with-icon div
                inputWithIcon.appendChild(inputElement);
                inputWithIcon.appendChild(searchIcon);
                // Append the input-with-icon div to the main container div
                input.appendChild(label);
                input.appendChild(inputWithIcon);
                // Append the main container div to the cell
                //cell.appendChild(input);
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
    }
}
