from dataclasses import dataclass

from django.db import models
from imagekit.processors import Thumbnail
from pilkit import utils

from .constants import BLUR_RADIUS, PIXEL_RATIO, PREVIEW_RATIO
from .processors import Blur
from .spec_fields import ImageSpecField

utils.RGBA_TRANSPARENCY_FORMATS = ["PNG", "WEBP"]
JPEG_OPTS = {"progression": True, "optimize": True}
JPEG2k_OPTS = {"irreversible": True}
PNG_OPTS = {"optimize": True}


@dataclass
class Spec:
    source: str
    width: int = 0
    height: int = 0
    blur: int = False
    default: str = "jpeg"
    crop: bool = False


class MultiImageMeta(models.base.ModelBase):
    def __new__(mcs, name, bases, dct):
        if "image_map" not in dct:
            return super().__new__(mcs, name, bases, dct)
        for spec_name, spec in dct["image_map"].items():
            c = PREVIEW_RATIO if spec.blur else PIXEL_RATIO
            params = dict()
            if spec.width:
                params.update(dict(width=spec.width * c))
            if spec.height:
                params.update(dict(height=spec.height * c))
            processors = [
                Thumbnail(
                    **params, crop=spec.crop, anchor="auto" if spec.crop else None
                )
            ]
            if spec.blur:
                processors.append(Blur(BLUR_RADIUS))
            dct[f"{spec_name}_default"] = ImageSpecField(
                processors,
                format=spec.default.upper(),
                options=JPEG_OPTS.copy() if spec.default == "jpeg" else PNG_OPTS.copy(),
                source=spec.source,
            )
            dct[f"{spec_name}_webp"] = ImageSpecField(
                processors, "WEBP", JPEG_OPTS.copy(), spec.source
            )
        return super().__new__(mcs, name, bases, dct)
