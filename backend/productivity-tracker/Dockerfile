# Use the official Python image
FROM python:3.10

# Set the working directory in the container
WORKDIR /app

# Copy and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application files
COPY . .

# Expose the port that the app runs on
EXPOSE 8080

# Start the application
CMD ["python", "app.py"]
