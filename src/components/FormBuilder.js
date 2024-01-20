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
                //cell.innerHTML = "&nbsp;"; // Add some content to the cell
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
          label.innerHTML = fieldConfig.label + (fieldConfig.required ? '<span style="color: red;">*</span>' : '');
          cell.appendChild(label);
        }
        // const label = document.createElement("label");
        // label.innerHTML = fieldConfig.label + (fieldConfig.required ? '<span style="color: red;">*</span>' : '');
        // cell.appendChild(label);

        // Add input based on field type
        let input;

        switch (fieldConfig.type) {
            case "text":
            case "number":
                input = document.createElement("input");
                input.type = fieldConfig.type;
                input.value = fieldConfig.value || "";
                break;

            case "select":
                input = document.createElement("select");
                fieldConfig.options.forEach(option => {
                    const optionElement = document.createElement("option");
                    optionElement.value = option;
                    optionElement.text = option;
                    input.appendChild(optionElement);
                });
                input.value = fieldConfig.value || "";
                break;

            case "date":
                input = document.createElement("input");
                input.type = fieldConfig.type;
                input.value = fieldConfig.value || "";
                break;

            case "datetime-local":
                input = document.createElement("input");
                input.type = fieldConfig.type;
                input.value = fieldConfig.value || "";
              break;  
              
            case "textarea":
                 input = document.createElement("textarea");
                 input.value = fieldConfig.value || "";
            
            break

           case "lookup":
              // Create the main container div
              input = document.createElement('div');
              input.className = 'input-container';

              let label = document.createElement("label");
              label.setAttribute("for", "account");
              label.innerHTML = fieldConfig.label + (fieldConfig.required ? '<span style="color: red;">*</span>' : '');

              // Create the input-with-icon div
              const inputWithIcon = document.createElement('div');
              inputWithIcon.className = 'input-with-icon';

              // Create the input element
              const inputElement = document.createElement('input');
              inputElement.type = 'text';
              inputElement.id = fieldConfig.id; // Use the provided ID for the input
              inputElement.name = fieldConfig.name || fieldConfig.id; // Use the provided name or fallback to ID
              inputElement.className = 'styled-input';
                
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
                openLookup(fieldConfig.id);
              });

              // Optionally, add click event to the search icon as well
              searchIcon.addEventListener('click', function () {
                openLookup(fieldConfig.id);
              });
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