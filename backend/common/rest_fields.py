from rest_framework.fields import FileField, get_attribute, ListField


class MultiImageField(FileField):
    def get_attribute(self, instance):
        request = self.context["request"]
        if not instance:
            return None
        if self.source:
            instance = get_attribute(instance, self.source_attrs[:-1])
            attr_name = self.source_attrs[-1]
        else:
            attr_name = self.source_attrs[0]
        try:
            origin_attr = instance.__class__.image_map[attr_name].source
            origin = getattr(instance, origin_attr)
            default = getattr(instance, f"{attr_name}_default")
        except AttributeError:
            return None
        if not origin:
            return None
        if request.user_agent.browser.family in [
            "Safari",
            "Mobile Safari",
            "Chrome Mobile iOS",
        ]:
            optimized = getattr(instance, f"{attr_name}_default")
        elif request.user_agent.browser.family in ["Internet Explorer"]:
            optimized = getattr(instance, f"{attr_name}_default")
        elif "Chrome" in request.user_agent.browser.family:
            optimized = getattr(instance, f"{attr_name}_webp")
        else:
            optimized = getattr(instance, f"{attr_name}_default")
        return optimized or default or origin
