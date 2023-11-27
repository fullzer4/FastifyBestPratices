package com.login.starter;

import io.vertx.core.AbstractVerticle;
import io.vertx.core.Promise;
import io.vertx.core.http.HttpMethod;
import io.vertx.ext.web.Router;
import io.vertx.ext.web.handler.CorsHandler;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.web.RoutingContext;

import java.util.ArrayList;
import java.util.List;

public class MainVerticle extends AbstractVerticle {

    private List<User> users = new ArrayList<>();

    @Override
    public void start(Promise<Void> startPromise) throws Exception {
        Router router = Router.router(vertx);

        CorsHandler corsHandler = CorsHandler.create("*")
                .allowedMethod(HttpMethod.GET)
                .allowedMethod(HttpMethod.POST)
                .allowedMethod(HttpMethod.OPTIONS)
                .allowedHeader("Content-Type")
                .allowedHeader("Access-Control-Allow-Origin")
                .allowedHeader("Authorization");

        router.route().handler(corsHandler);
        router.post("/register").handler(this::handleRegister);

        router.post("/login").handler(this::handleLogin);

        vertx.createHttpServer()
                .requestHandler(router)
                .listen(8888, http -> {
                    if (http.succeeded()) {
                        startPromise.complete();
                        System.out.println("HTTP server started on port 8888");
                    } else {
                        startPromise.fail(http.cause());
                    }
                });
    }

    private void handleRegister(RoutingContext routingContext) {
      JsonObject body = routingContext.getBodyAsJson();
      System.out.println("Received body: " + routingContext.getBodyAsString());

      if (body == null) {
          routingContext.response()
              .setStatusCode(400)
              .putHeader("content-type", "application/json")
              .end(new JsonObject().put("error", "Invalid request body").encode());
          return;
      }

      String name = body.getString("name");
      String email = body.getString("email");
      String password = body.getString("password");

      if (name == null || email == null || password == null) {
          routingContext.response()
              .setStatusCode(400)
              .putHeader("content-type", "application/json")
              .end(new JsonObject().put("error", "Invalid request body").encode());
          return;
      }

      User newUser = new User(name, email, password);
      users.add(newUser);

      routingContext.response()
          .putHeader("content-type", "application/json")
          .end(new JsonObject().put("message", "Usuario registrado").encode());
  }



    private void handleLogin(RoutingContext routingContext) {
        JsonObject body = routingContext.getBodyAsJson();
        String email = body.getString("email");
        String password = body.getString("password");

        User user = users.stream()
                .filter(u -> u.getEmail().equals(email) && u.getPassword().equals(password))
                .findFirst()
                .orElse(null);

        if (user != null) {
            routingContext.response()
                    .putHeader("content-type", "application/json")
                    .end(new JsonObject().put("message", "Login com sucesso").encode());
        } else {
            routingContext.response().setStatusCode(401)
                    .putHeader("content-type", "application/json")
                    .end(new JsonObject().put("message", "credenciais invalidas").encode());
        }
    }

    private static class User {
        private String name;
        private String email;
        private String password;

        public User(String name, String email, String password) {
            this.name = name;
            this.email = email;
            this.password = password;
        }

        public String getEmail() {
            return email;
        }

        public String getPassword() {
            return password;
        }
    }
}
