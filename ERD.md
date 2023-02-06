```mermaid
erDiagram

  User {
    String id PK 
    String name  
    String email  
    String passwordHash  
    String avatar  
    }
  

  Register {
    String id PK 
    DateTime createdAt  
    String token  
    String name  
    String email  
    }
  
```
