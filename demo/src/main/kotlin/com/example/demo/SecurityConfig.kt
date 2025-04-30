package com.example.demo

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.web.SecurityFilterChain
import org.springframework.security.config.Customizer

@Configuration
class SecurityConfig {

    @Suppress("SpringJavaInjectionPointsAutowiringInspection")
    @Bean
    fun filterChain(http: HttpSecurity): SecurityFilterChain {
        http
            .csrf { it.disable() }
            .authorizeHttpRequests {
                it
                    .requestMatchers("/api/public/**").permitAll()
                    .requestMatchers("/api/admin/**").hasAuthority("ROLE_admin")
                    .requestMatchers("/api/user/**").hasAuthority("ROLE_user")
                    .anyRequest().authenticated()
            }
            .oauth2ResourceServer {
                it.jwt(Customizer.withDefaults())
            }

        return http.build()
    }
}
