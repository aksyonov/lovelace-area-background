# Area Background

Sets the background of your Home Assistant view to match the picture of a specific area.

## Preview

Dark Theme:

![Dark Theme](https://user-images.githubusercontent.com/2206553/216120028-6773847d-83fd-4a7a-a189-bc6d3052187a.png)

Light Theme:

![Light Theme](https://user-images.githubusercontent.com/2206553/216120040-622b3e76-417c-4b36-8d13-a19ee4854178.png)

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
