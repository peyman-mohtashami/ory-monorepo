package com.example.demobe

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.core.annotation.Order
import org.springframework.security.config.Customizer
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.web.SecurityFilterChain

@Configuration
class SecurityConfig {

    @Suppress("SpringJavaInjectionPointsAutowiringInspection")
    @Bean
    fun filterChain(http: HttpSecurity): SecurityFilterChain {
        http
            .csrf { it.disable() }
            .authorizeHttpRequests {
                it
                    .requestMatchers("/api/public/**", "/ory/**").permitAll()
                    .requestMatchers("/api/admin/**").hasAuthority("ROLE_admin")
                    .requestMatchers("/api/user/**").hasAuthority("ROLE_user")
                    .anyRequest().authenticated()
            }
            .oauth2ResourceServer {
                it.jwt(Customizer.withDefaults())
            }
//            .securityMatcher { request ->
//                // Only apply security if it's not one of the public endpoints
//                val path = request.servletPath
//                !(path.startsWith("/api/public") || path.startsWith("/ory"))
//            }

        return http.build()
    }
    // Public endpoints – NO auth required
//    @Bean
//    @Order(1)
//    fun publicEndpoints(http: HttpSecurity): SecurityFilterChain {
//        http
//            .securityMatcher("/api/public/**", "/ory/**")
//            .authorizeHttpRequests { auth ->
//                auth.anyRequest().permitAll()
//            }
//            .csrf { it.disable() }
//        return http.build()
//    }

    // Protected endpoints – Auth with JWT
//    @Bean
//    @Order(2)
//    fun securedEndpoints(http: HttpSecurity): SecurityFilterChain {
//        http
//
//            .authorizeHttpRequests {
//                it
//                    .requestMatchers("/api/admin/**").hasAuthority("ROLE_admin")
//                    .requestMatchers("/api/user/**").hasAuthority("ROLE_user")
//                    .anyRequest().authenticated()
//            }
//            .csrf { it.disable() }
//            .oauth2ResourceServer {
//                it.jwt(Customizer.withDefaults())
//            }
//
//        return http.build()
//    }
// Public endpoints (no auth)
//@Bean
//@Order(1)
//fun publicFilterChain(http: HttpSecurity): SecurityFilterChain {
//    http
//        .securityMatcher("/api/public/**", "/ory/**")
//        .authorizeHttpRequests { auth ->
//            auth.anyRequest().permitAll()
//        }
//        .csrf { it.disable() }
////        .oauth2ResourceServer { oauth ->
//            // 💡 Instead of disable(), just don't configure JWT at all here.
////        }
////        .oauth2ResourceServer { it.jwt().disable() } // 💥 this disables JWT for this chain
////        .build()
//
//    return http.build()
//}
//
//    // Protected endpoints (JWT required)
//    @Bean
//    @Order(2)
//    fun protectedFilterChain(http: HttpSecurity): SecurityFilterChain {
//        http
//            .csrf { it.disable() }
//            .authorizeHttpRequests {
//                it
//                    .requestMatchers("/api/admin/**").hasAuthority("ROLE_admin")
//                    .requestMatchers("/api/user/**").hasAuthority("ROLE_user")
//                    .anyRequest().authenticated()
//            }
//            .oauth2ResourceServer {
//                it.jwt(Customizer.withDefaults())
//            }
//
//        return http.build()
//    }
}
