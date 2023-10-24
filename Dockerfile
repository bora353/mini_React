FROM node:18-alpine
WORKDIR /react-miniproejct/frontend
COPY package.json package-lock.json ./
# Docker 빌드 컨텍스트 내의 모든 파일과 디렉토리를 컨테이너의 현재 작업 디렉토리로 복사
COPY ./ ./  
RUN npm install
ENTRYPOINT ["npm", "run", "start"]
EXPOSE 3000