import * as lzstring from "lz-string";
import DeviceList from "./DeviceList";
import compressedInternalDeviceList from "./compressedInternalDeviceList";

const getInternalDeviceList = (): DeviceList =>
  JSON.parse(
    lzstring.decompressFromEncodedURIComponent(compressedInternalDeviceList),
  ) as DeviceList;

export default getInternalDeviceList;
