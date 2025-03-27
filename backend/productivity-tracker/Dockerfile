# Use the official Python image
FROM python:3.10-slim

# Set the working directory in the container
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Copy and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt \
    && pip install gunicorn

# Copy the rest of the application files
COPY . .

# Expose the port that the app runs on
EXPOSE 8080

# Use gunicorn to run the application
CMD ["gunicorn", "--bind", "0.0.0.0:8080", "--workers", "4", "app:app"]