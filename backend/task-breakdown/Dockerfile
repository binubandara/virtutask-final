# Step 1: Use the official Python image as the base image
FROM python:3.10-slim

# Step 2: Set working directory inside the container
WORKDIR /app

# Step 3: Install system dependencies (if any)
RUN apt-get update && apt-get install -y libpq-dev

# Step 4: Copy requirements.txt to the container
COPY requirements.txt .

# Step 5: Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Step 6: Copy the entire project into the container
COPY . .

# Step 7: Expose port 8080 for Cloud Run
EXPOSE 8080

# Step 8: Run the FastAPI app with uvicorn
CMD exec uvicorn main:app --host 0.0.0.0 --port ${PORT:-8080}