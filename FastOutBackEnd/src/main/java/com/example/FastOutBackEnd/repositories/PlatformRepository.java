package com.example.FastOutBackEnd.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.FastOutBackEnd.entities.Platform;

@Repository
public interface PlatformRepository extends JpaRepository<Platform, UUID>{

}
