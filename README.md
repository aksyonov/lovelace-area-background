# Area Background

Sets the background of your Home Assistant view to match the picture of a specific area.

## Preview

Dark Theme:

![FireShot Capture 001 - Overview – Home Assistant - home-assistant local](https://user-images.githubusercontent.com/2206553/216085403-78286285-5c7b-4082-8365-c05e98fdde0d.png)

Light Theme:

![FireShot Capture 002 - Overview – Home Assistant - home-assistant local](https://user-images.githubusercontent.com/2206553/216085446-e7c88ea4-0c03-43b1-95f9-8f792a175844.png)

## Usage

You can use this plugin in 2 ways - UI or YAML

### UI

1. Open a lovelace dashboard, then enter edit mode by clicking `more` icon in the top right corner, then click `Edit Dashboard`.
2. Open View Configuration by clicking `pencil` icon next to a view name or icon.
3. You can see additional select field `Area Background` where you can select one of existing areas
4. Save the configuration

### YAML

Add next line

```yaml
area_background: area_id
```

to the view config. You can find id of the area by going into `Settings` -> `Areas & Zones` and opening any area, then just copy last part of the URL in a browser (after `/area/`).
