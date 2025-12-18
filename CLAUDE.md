# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**luneNexus** is a Python project currently in its initial setup phase. The project uses Python 3.12.10 with a virtual environment configured.

## Development Environment

### Virtual Environment
- Python version: 3.12.10
- Virtual environment location: `.venv/`
- To activate: `.venv\Scripts\activate` (Windows) or `source .venv/bin/activate` (Unix)

### Common Commands

Since this is a new project, these commands will be relevant as development progresses:

```bash
# Activate virtual environment
.venv\Scripts\activate  # Windows
source .venv/bin/activate  # Unix/macOS

# Install dependencies (when requirements.txt is created)
pip install -r requirements.txt

# Install development dependencies (when created)
pip install -r requirements-dev.txt

# Run tests (when test framework is set up)
python -m pytest

# Format code (when formatter is configured)
black .
isort .

# Lint code (when linter is configured)
flake8 .
pylint src/

# Type checking (when mypy is configured)
mypy src/
```

## Project Structure

Currently empty - structure will be defined as development progresses. Typical Python project structure would include:
- `src/` - Source code
- `tests/` - Test files
- `requirements.txt` - Production dependencies
- `requirements-dev.txt` - Development dependencies
- `pyproject.toml` - Project configuration
- `README.md` - Project documentation

## Development Notes

This project is in its initial setup phase. Key files and configurations will need to be created as development begins:

1. Project configuration (`pyproject.toml` or `setup.py`)
2. Dependency management (`requirements.txt`)
3. Testing framework setup
4. Code formatting and linting configuration
5. CI/CD pipeline configuration