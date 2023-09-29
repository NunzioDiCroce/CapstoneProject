package com.example.FastOutBackEnd.payloads;

import com.example.FastOutBackEnd.entities.User;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class LoginSuccessfullPayload {
	
	String accessToken;
	User user;

}
