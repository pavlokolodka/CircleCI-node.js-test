FROM postgres
WORKDIR /app
COPY prisma ./prisma/
COPY .env ./
RUN npx prisma generate