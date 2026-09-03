"""Generate platform icon assets from a square RGBA master image."""

from pathlib import Path
import sys

from PIL import Image


def main() -> None:
    if len(sys.argv) != 3:
        raise SystemExit("usage: generate-brand-icons.py MASTER_IMAGE PROJECT_ROOT")

    master_path = Path(sys.argv[1])
    project_root = Path(sys.argv[2])
    image = Image.open(master_path).convert("RGBA")

    brand_dir = project_root / "assets" / "brand"
    brand_dir.mkdir(parents=True, exist_ok=True)
    image.save(brand_dir / "voice-translation-master.png")

    image.resize((1024, 1024), Image.Resampling.LANCZOS).save(project_root / "assets" / "icon.png")
    image.resize((512, 512), Image.Resampling.LANCZOS).save(project_root / "public" / "logo512.png")
    image.resize((192, 192), Image.Resampling.LANCZOS).save(project_root / "public" / "logo192.png")
    image.resize((512, 512), Image.Resampling.LANCZOS).save(project_root / "src" / "assets" / "logo.png")

    ico_sizes = [(16, 16), (24, 24), (32, 32), (48, 48), (64, 64), (128, 128), (256, 256)]
    image.save(project_root / "assets" / "icon.ico", format="ICO", sizes=ico_sizes)
    image.save(project_root / "public" / "favicon.ico", format="ICO", sizes=ico_sizes)

    icns_source = image.resize((1024, 1024), Image.Resampling.LANCZOS)
    icns_source.save(project_root / "assets" / "icon.icns", format="ICNS")


if __name__ == "__main__":
    main()
