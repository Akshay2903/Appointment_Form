const userName = document.getElementById('name');
const email = document.getElementById('email');
const phone = document.getElementById('number');
const myForm = document.getElementById('my-form');
const userList = document.getElementById('list');

myForm.addEventListener('submit', fetchData);

async function fetchData(e) {
    e.preventDefault();
    const userDetails = {
        name: userName.value,
        email: email.value,
        phone: phone.value
    };

    try {
        const response = await axios.post('http://localhost:3000/user/data', userDetails, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const userData = response.data;
        createLiElement(userData);
    } catch (err) {
        console.error(err);
    }
}

function createLiElement(userData) {
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(`Name: ${userData.name}, Email: ${userData.email}, Phone: ${userData.phone}`));

    var delbtn = document.createElement('button');
    delbtn.type = 'button';
    delbtn.className = 'delete';
    delbtn.id = 'deleteButton';
    delbtn.appendChild(document.createTextNode('Delete'));
    li.appendChild(delbtn);

    var editBtn = document.createElement('button');
    editBtn.type = 'button';
    editBtn.className = 'edit';
    editBtn.id = 'editButton';
    editBtn.appendChild(document.createTextNode('Edit'));
    li.appendChild(editBtn);

    userList.appendChild(li);

    userName.value = '';
    email.value = '';
    phone.value = '';

    delbtn.onclick = async (e) => {
        const target = e.target.parentElement;
        try {
            const id = userData.id;
            await axios.delete(`http://localhost:3000/user/delete-user/${id}`);
            userList.removeChild(target);
        } catch (error) {
            console.log(error);
        }
    };

    editBtn.onclick = () => {
        // You should implement an editing functionality here
    };
}

document.addEventListener('DOMContentLoaded', loadServerDetails);
async function loadServerDetails() {
    try {
        const dbData = await axios.get('http://localhost:3000/user/user-data');
        const usersData = dbData.data;
        if (usersData.length < 1) {
            console.log("No users");
        }

        for (let i = 0; i < usersData.length; i++) {
            createLiElement(usersData[i]);
        }
    } catch (err) {
        console.log(err);
    }
}
