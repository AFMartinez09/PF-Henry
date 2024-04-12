import { Request, Response } from 'express';
import { Review } from '../models/Review';

export const disableReview = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send({ error: "Falta el ID de la revisión" });
    }

    // Encuentra la revisión por su ID
    const review = await Review.findByPk(id);

    // Si no se encuentra la revisión, devuelve un error 404
    if (!review) {
      return res.status(404).send({ error: "La revisión no se encontró" });
    }

    // Cambia el estado de habilitado
    review.habilitado = !review.habilitado;

    // Guarda los cambios en la base de datos
    await review.save();

    return res.status(200).send({ message: "El estado de la revisión se actualizó correctamente" });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: "Error al procesar la solicitud", detalle: error });
  }
};
