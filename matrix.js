function generateMatrices() {
    createMatrix('The 1st Matrix', 'matrix1', document.getElementById('matrix1Rows').value, document.getElementById('matrix1Cols').value);
    createMatrix('The 2nd Matrix','matrix2', document.getElementById('matrix2Rows').value, document.getElementById('matrix2Cols').value);
}

const createMatrix = (title, containerId, rows, cols) => {
    let container = document.getElementById(containerId);
    container.innerHTML = ''; // Clear previous content
    let table = document.createElement('table');
    for (let i = 0; i < rows; i++) {
        let tr = document.createElement('tr');
        for (let j = 0; j < cols; j++) {
            let td = document.createElement('td');
            let input = document.createElement('input');
            input.type = 'number';
            input.value = Math.floor(Math.random() * 100); // Random value between 0 and 99
            td.appendChild(input);
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    let caption = table.createCaption();
    caption.textContent = title;
    container.appendChild(table);
};

const showResult = (title, containerId, rows, cols, dataArray) => {
    let container = document.getElementById(containerId);
    container.innerHTML = ''; // Clear previous content
    let table = document.createElement('table');

    for (let i = 0; i < rows; i++) {
        let tr = document.createElement('tr');
        for (let j = 0; j < cols; j++) {
            let td = document.createElement('td');
            let span = document.createElement('span');
            // Calculate the index in the dataArray based on current row and column
            let index = i * cols + j;
            if (index < dataArray.length) {
                span.innerHTML = dataArray[index];
            }
            td.appendChild(span);
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }

    let caption = table.createCaption();
    caption.textContent = title;
    container.appendChild(table);
};

const showResult2D = (title, containerId, dataArray) => {
	// dataArray is a 2D array
	// complete this function based on the showResult function

}

function checkMatricesDimForAddSub(matrix1, matrix2){
    if (matrix1.length !== matrix2.length) {
        alert(`Row count doesn't match: \nMatrix 1: ${matrix1.length}\nMatrix 2: ${matrix2.length}`)
        return 1
    }
    if (matrix1[0].length !== matrix2[0].length) {
        alert(`Column count doesn't match: \nMatrix 1: ${matrix1[0].length}\nMatrix 2: ${matrix2[0].length}`)
        return 1
    }
    return 0
}

function checkMatricesDimForMul(matrix1, matrix2){
    if (matrix1[0].length !== matrix2.length) {
        alert(`Dimension doesn't match: \nMatrix 1 columns: ${matrix1[0].length}\nMatrix 2 rows: ${matrix2.length}`)
        return 1
    }
    return 0
}

function performOperation(operation) {
    let matrix1 = getMatrixData2D('matrix1');
    let matrix2 = getMatrixData2D('matrix2');
    console.log("1st Matrix",matrix1);
    console.log("2nd Matrix", matrix2);
    console.log("Operation", operation);
    // Just a test result
    let result = [];
    let rows = 0;
    let cols = 0;
    if (operation === 'add') {
        if (checkMatricesDimForAddSub(matrix1, matrix2)){
            return
        }
        result = addMatrices(matrix1, matrix2)
        rows = matrix1.length
        cols = matrix1[0].length
    } else if (operation === 'subtract') {
        if (checkMatricesDimForAddSub(matrix1, matrix2)){
            return
        }
        result = subtractMatrices(matrix1, matrix2)
        rows = matrix1.length
        cols = matrix1[0].length
    } else if (operation === 'multiply') {
        if (checkMatricesDimForMul(matrix1, matrix2)) {
            return
        }
        result = multiplyMatrices(matrix1, matrix2)
        rows = matrix1.length
        cols = matrix2[0].length
    } else {
        alert(`Operation ${operation} not allowed`)
    }
    // Call your matrix calculation functions here
    // For example: if (operation === 'add') { addMatrices(matrix1, matrix2); }
	// prints suitable messages for impossible situation
    showResult('The Result', 'matrix3', rows, cols, result); // use suitable function for printing results
}

const getMatrixData1D = function (matrixId) {
    let matrixData = [];
    let inputs = document.querySelectorAll(`#${matrixId} input`);
    inputs.forEach(input => {
        matrixData.push(parseInt(input.value, 10));
    });
    return matrixData;
};

const getMatrixData2D = function (matrixId) {
    let matrixData = [];
    let rows = parseInt(document.getElementById(matrixId + 'Rows').value, 10);
    let cols = parseInt(document.getElementById(matrixId + 'Cols').value, 10);
    let inputs = document.querySelectorAll(`#${matrixId} input`);

    for (let i = 0; i < rows; i++) {
        let rowData = [];
        for (let j = 0; j < cols; j++) {
            // Calculate index in the flat list of inputs
            let index = i * cols + j;
            if (index < inputs.length) {
                rowData.push(parseInt(inputs[index].value, 10));
            } else {
                rowData.push(0); // Default value if input is missing
            }
        }
        matrixData.push(rowData);
    }
    return matrixData;
};


// Add your matrix calculation functions here
// The functions must check the posibility of calculation too.
function addMatrices(matrix1, matrix2){
    let matrix3 = []
    for (let i=0; i<matrix1.length; i++) {
        let row = [];
        for (let j=0; j<matrix1[0].length; j++) {
            row.push(matrix1[i][j]+matrix2[i][j])
        }
        matrix3.push(row)
    }
    return matrix3;
}
const subtractMatrices = function (matrix1, matrix2) {
    let matrix3 = []
    for (let i=0; i<matrix1.length; i++) {
        let row = [];
        for (let j=0; j<matrix1[0].length; j++) {
            row.push(matrix1[i][j]-matrix2[i][j])
        }
        matrix3.push(row)
    }
    return matrix3;
};
const multiplyMatrices = (matrix1, matrix2) => {
    let matrix3 = []
    for (let i=0; i<matrix1.length; i++) {
        let row = [];
        for (let j=0; j<matrix2[0].length; j++) {
            let x = 0;
            for (let k=0; k<matrix2.length; k++){
                x += matrix1[i][k]*matrix2[k][j]
            }
            row.push(x)
        }
        matrix3.push(row)
    }
    return matrix3;
};
