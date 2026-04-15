from typing import Protocol


class StorageInterface(Protocol):
    def increment_with_expiry(self, key: str, window: int) -> int:
        """Increment counter and set expiry. Returns current count."""
        ...

    def get_client(self):
        """Return storage client for compatibility."""
        ...