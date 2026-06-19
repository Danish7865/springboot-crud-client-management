const submit = document.querySelector('#submit');
let editingId = null;

const callBackendApi = async() => {
	
	let clientName = document.getElementById("name").value;
	let url = "http://localhost:8080/save";
	let method = "POST";

	if (editingId != null) {
	    url = `http://localhost:8080/update/${editingId}`;
	    method = "PUT";
	}

	let response2 = await fetch(url, {
	    method: method,
	    headers: {
	        "Accept": "application/json",
	        "Content-Type": "application/json"
	    },
	    body: JSON.stringify({
	        name: clientName
	    })
	});
	let response = await fetch("http://localhost:8080/getClients");
	console.log(response2);
	console.log(response);
	document.getElementById("message").innerText = "Client Saved Successfully!";
	document.getElementById("name").value = "";

	editingId = null;
	document.getElementById("submit").innerText = "Submit";

	loadClients();
}

submit.addEventListener('click', callBackendApi);
async function loadClients() {

    let response = await fetch("http://localhost:8080/getClients");

    let clients = await response.json();

    let tableBody = document.querySelector("#clientTable tbody");

    tableBody.innerHTML = "";

    clients.forEach(client => {

		tableBody.innerHTML += `
		<tr>
		    <td>${client.id}</td>
		    <td>${client.name}</td>
		    <td>
		        <button onclick="editClient(${client.id}, '${client.name}')">Edit</button>
		        <button onclick="deleteClient(${client.id})">Delete</button>
		    </td>
		</tr>
		`;
    });

}
loadClients();
async function deleteClient(id) {

    await fetch(`http://localhost:8080/delete/${id}`, {
        method: "DELETE"
    });

    loadClients();
}
function editClient(id, name) {

    document.getElementById("name").value = name;

    document.getElementById("submit").innerText = "Update";

    editingId = id;
}