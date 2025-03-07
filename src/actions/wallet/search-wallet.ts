"use server";

import {
  ErrorGetWalletsResponse,
  SuccessGetWalletsResponse,
} from "@/app/_api-types/wallets";
import { ActionResult } from "../action.type";
import { DEFAULT_ACTION_ERROR_MESSAGE } from "../action.const";


export async function searchWallet(
  formData: FormData
): Promise<ActionResult<SuccessGetWalletsResponse["data"]>> {
  try {
    const searchQuery = formData.get("searchQuery") as string;

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/wallets?query=${searchQuery}`
    );
    const res = await response.json();

    if (response.ok) {
      const successData: SuccessGetWalletsResponse = res;

      if (!successData.data?.wallets) {
        throw new Error("No wallets found");
      }

      return {
        success: true,
        message: successData.message,
        payload: successData.data,
      };
    } else {
      const errorData: ErrorGetWalletsResponse = res;
      throw new Error(errorData.message);
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return {
      success: false,
      message: DEFAULT_ACTION_ERROR_MESSAGE,
    };
  }
}
