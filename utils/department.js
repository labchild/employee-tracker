const deptartmentPrompts = [
    {
        type: 'input',
        name: '_name',
        message: "Enter the name of the dpertmant you'd like to add.",
        validate: deptInput => {
            if (!deptInput) {
                console.log('The new department still needs a name.');
                return false;
            }
            return true;
        }
    }
];

const getAllDeptartments = () => {
    fetch('/api/depts', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
    });
};

const addNewDepartment = deptName => {
    fetch('/api/depts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            _name: deptName._name
        })
    });
};

module.exports = { 
    deptartmentPrompts,
    getAllDeptartments,
    addNewDepartment
};