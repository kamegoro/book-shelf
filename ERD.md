```mermaid
erDiagram

  User {
    String id PK
    String name
    String email
    String passwordHash
    String avatar  "nullable"
    }


  Register {
    String id PK
    DateTime createdAt
    String token
    String name
    String email
    }


  Book {
    String id PK
    DateTime createdAt
    String title
    String description
    String image  "nullable"
    }

    Book o{--|| User : "author"
```
