package com.example.FastOutBackEnd.payloads;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class UserRequestPayload {
	
	@NotNull(message = "The name is required.")
	@Size(min = 3, max = 30, message = "The name must have a minimum of 3 characters, a maximum of 30.")
	private String name;
	@NotNull(message = "The surname is required.")
	private String surname;
	@NotNull(message = "The email is required.")
	@Email(message = "The email is not a valid address.")
	private String email;
	@NotNull(message = "Password is required.")
	private String password;

}
