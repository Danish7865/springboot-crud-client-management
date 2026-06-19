package com.example.demo;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ClientService {

	@Autowired
	ClientRepository clientRepository;
	
	public boolean saveClient(Client client) {
		try {
			Client savedClient = clientRepository.save(client);
			
			if(savedClient != null) {
				return true;
			} else {
				return false;
			}
			
		} catch (Exception e) {
			// TODO: handle exception
		}
		
		return false;
	}
	
	public List<Client> getClients() {
		return clientRepository.findAll();
	}
	
	public void deleteClient(Integer id) {
	    clientRepository.deleteById(id);
	}
	
	public void updateClient(Integer id, Client client) {

	    Client existingClient = clientRepository.findById(id).orElse(null);

	    if (existingClient != null) {
	        existingClient.setName(client.getName());
	        clientRepository.save(existingClient);
	    }
	}
}

/*
 {
 	name : kartik
 	gender: male
 }
 */

