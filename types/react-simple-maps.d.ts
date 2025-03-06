// types/react-simple-maps.d.ts
declare module "react-simple-maps" {
  import { ComponentType, SVGProps, ReactNode } from "react";

  interface ComposableMapProps {
    width?: number;
    height?: number;
    projection?: string | ((width: number, height: number) => any);
    projectionConfig?: Record<string, any>;
    className?: string;
    children?: ReactNode; // Add children prop
  }

  interface GeographyObject {
    rsmKey: string;
    properties: { name: string }; // Adjust based on your GeoJSON
    geometry: any; // Could be refined further if you have specific GeoJSON types
  }

  interface GeographiesProps {
    geography: string | object;
    children?: (args: { geographies: GeographyObject[] }) => ReactNode;
  }

  interface GeographyProps extends SVGProps<SVGPathElement> {
    geography: GeographyObject;
  }

  export const ComposableMap: ComponentType<ComposableMapProps>;
  export const Geographies: ComponentType<GeographiesProps>;
  export const Geography: ComponentType<GeographyProps>;
}
