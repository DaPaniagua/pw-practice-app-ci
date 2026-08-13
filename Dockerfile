FROM mcr.microsoft.com/playwright:v1.62.1-noble

RUN mkdir /app
WORKDIR /app
COPY . /app/

RUN npm install --from
RUN npx playwright install
