\\env

API_PORT=4000
DATABASE_URL="postgresql://postgres:root@postgres_gateway:5432/users?schema=public"

ACCESS_JWT_EXPIRATION_TIME=3000s
REFRESH_JWT_EXPIRATION_TIME=1
DOMAIN=localhost
REFRESH_TOKEN_NAME="refreshToken"

JWT_SECRET_KEY="You secret jwt access token key"
JWT_REFRESH_TOKEN="You secret jwt refresh token key"

RULE_MESSAGE="Данное поле должно быть длиной не менее 2 символов."
RULE_MESSAGE_LENGTH=2

\\ docker-compose.yml
\\ запускается из корневой папки с двумя проектами: gateway, tasks

version: "3.0"

services:
postgres_gateway:
container_name: postgres_gateway
image: postgres
environment:
POSTGRES_USER: postgres
POSTGRES_PASSWORD: root
volumes: - pgdata:/var/lib/postgresql/data
ports: - "15432:5432"
restart: always

postgres_tasks:
container_name: postgres_tasks
image: postgres
environment:
POSTGRES_USER: postgres
POSTGRES_PASSWORD: root
volumes: - pgdata:/var/lib/postgresql/data
ports: - "25432:5432"
restart: always

rabbitmq:
container_name: rabbitmq
image: rabbitmq:3-management
environment:
RABBITMQ_DEFAULT_USER: "guest"
RABBITMQ_DEFAULT_PASS: "guest"
ports: - "5672:5672" - "15672:15672"

gateway:
build: ./gateway
container_name: gateway
volumes: - "./gateway:/src/app"
working_dir: "/src/app"
ports: - 4000:4000 - 9229:9229
command: npm run start
depends_on: - postgres_gateway - rabbitmq
restart: always

tasks:
build: ./tasks
container_name: tasks
working_dir: "/src/app"
volumes: - "./tasks:/src/app"
command: npm run start
depends_on: - postgres_tasks - rabbitmq
restart: always

volumes:
pgdata:
