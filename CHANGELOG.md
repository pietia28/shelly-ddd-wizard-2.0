# 🧾 Changelog

## [2.0.1] - 2025-10-15
### Added
- Support for combined RGB parameter (`rgb=[r,g,b]`) in Shelly RGBW devices.
- Detailed input range validation for brightness, RGB, and offset parameters.

### Fixed
- URL encoding issue where RGB arrays were being encoded as `%5B...%5D`.
- Minor UI improvements in extra parameters section.

### Notes
- Backward compatible with v2.0.0.
