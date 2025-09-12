package org.aprende_shop.aprende_shop;

import org.aprende_shop.aprende_shop.config.JwtFilter;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class AprendeShopApplication {

	public static void main(String[] args) {
		//System.out.println("Version: 1.2");
		SpringApplication.run(AprendeShopApplication.class, args);
	}
	
	@Bean
	public FilterRegistrationBean<JwtFilter> jwtFilter(){
		FilterRegistrationBean<JwtFilter> registrationBean = new FilterRegistrationBean<JwtFilter> ();
		registrationBean.setFilter(new JwtFilter());
		registrationBean.addUrlPatterns("/api/cursos/*");
		registrationBean.addUrlPatterns("/api/usuarios/*");
		return registrationBean;
		 
	}

}
