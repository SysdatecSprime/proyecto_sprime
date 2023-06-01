import {
  BadgeDelta,
  Card,
  Flex,
  Metric,
  ProgressBar,
  Text,
  Title,
} from "@tremor/react";

export default function CardTiempo({
  titulo,
  valor,
  porcentajeDeCambio,
  porcentajeDeAvance,
  color = "blue",
}) {
  return (
    <Card>
      <Title className="pb-2">{titulo}</Title>
      <Flex alignItems="start">
        <div className="truncate">
          <Metric className="text-xl truncate">{valor} días</Metric>
        </div>
        <BadgeDelta
          deltaType={porcentajeDeCambio > 0 ? "increase" : "decrease"}
        >
          {porcentajeDeCambio}%
        </BadgeDelta>
      </Flex>
      <Flex className="mt-4 space-x-2">
        <Text>10 días</Text>
        <Text className="truncate">{`${porcentajeDeAvance}% (${valor} días)`}</Text>
        <Text>1 día</Text>
      </Flex>
      <ProgressBar
        percentageValue={porcentajeDeAvance}
        color={color}
        className="mt-2"
      />
    </Card>
  );
}
