/**
 * @ Author: ZhengHui
 * @ Create Time: 2023-11-20 15:56:02
 * @ Modified by: ZhengHui
 * @ Modified time: 2023-11-23 15:51:28
 * @ Description:
 */

import { BeakerIcon } from "@heroicons/react/20/solid";

const Header = () => {
  return (
    <div className="h-14 bg-black flex items-center">
      <BeakerIcon className="h-6 w-6 text-gray-600 ml-6" />
    </div>
  );
};

export default Header;
