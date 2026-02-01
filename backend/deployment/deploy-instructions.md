# Deploying Auteur API to GCP

## Prerequisites

- GCP Compute Engine VM (e2-medium, Ubuntu 22.04)
- SSH access to the VM
- Java 21 installed on the VM

## Steps

1. **Build the JAR locally**:

   ```bash
   cd backend
   mvn clean package
   ```

2. **Upload Artifacts**:

   ```bash
   scp target/backend-0.0.1-SNAPSHOT.jar user@ip:/tmp/backend.jar
   scp deployment/auteur-api.service user@ip:/tmp/auteur-api.service
   ```

3. **Setup on VM**:

   ```bash
   # Connect to VM
   ssh user@ip

   # Move JAR
   sudo mkdir -p /opt/auteur
   sudo mv /tmp/backend.jar /opt/auteur/

   # Creaet user
   sudo useradd -r -s /bin/false auteur
   sudo chown -R auteur:auteur /opt/auteur

   # Move Service File
   sudo mv /tmp/auteur-api.service /etc/systemd/system/

   # Reload and Start
   sudo systemctl daemon-reload
   sudo systemctl enable auteur-api
   sudo systemctl start auteur-api
   ```

4. **Verify**:
   ```bash
   sudo systemctl status auteur-api
   curl http://localhost:8080/health
   ```
