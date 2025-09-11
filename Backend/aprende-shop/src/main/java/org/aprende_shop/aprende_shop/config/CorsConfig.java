package org.aprende_shop.aprende_shop.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
public class CorsConfig {

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        
        // SOLO TU IP - LA MÁS IMPORTANTE
        configuration.setAllowedOrigins(Arrays.asList(
        		 "http://18.116.202.4",           // ← TU IP DIRECTAMENTE
                 "http://18.116.202.4:80",        // Con puerto 80 (HTTP)
                 "http://18.116.202.4:8080",      // Si usas puerto 8080
                 "http://localhost:5500",         // Desarrollo local
                 "http://127.0.0.1:5500",         // Desarrollo local alternativo
                 "http://localhost:8080",         // Localhost
                 "http://127.0.0.1:8080"          // Localhost alternativo
        ));
        
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type"));
        configuration.setAllowCredentials(true);
        configuration.setExposedHeaders(Arrays.asList("Authorization"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
