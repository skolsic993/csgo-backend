import axios from "axios";
import { Request, Response } from "express";
import config from "./../config/default";

const token = config?.token;

export async function getUserHubs(req: Request, res: Response): Promise<any> {
  const url = "https://open.faceit.com/data/v4/players";

  try {
    const response = await axios.get(
      `${url}/${req.params.id}/hubs?offset=0&limit=20`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return res.send(response.data);
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function getUserHubDetails(
  req: Request,
  res: Response
): Promise<any> {
  const url = "https://open.faceit.com/data/v4/hubs";

  try {
    const response = await axios.get(`${url}/${req.params.id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return res.send(response.data);
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function getUserHubMembers(
  req: Request,
  res: Response
): Promise<any> {
  const url = "https://open.faceit.com/data/v4/hubs";

  try {
    const response = await axios.get(
      `${url}/${req.params.id}/members?offset=0&limit=20`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return res.send(response.data);
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function getUserHubRoles(
  req: Request,
  res: Response
): Promise<any> {
  const url = "https://open.faceit.com/data/v4/hubs";

  try {
    const response = await axios.get(
      `${url}/${req.params.id}/roles?offset=0&limit=20`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return res.send(response.data);
  } catch (error: any) {
    throw new Error(error);
  }
}
